import { MapConnection, TimetableConnection } from "./connection.js";

/**
 * The possible groups of routes to retrieve with getRoutesByGroup
 */
export const RouteGroup = {
    ON_CAMPUS: "OnCampus",
    OFF_CAMPUS: "OffCampus",
    GAMEDAY: "Gameday",
    ALL: ["OnCampus", "OffCampus", "Gameday"]
}


/**
 * Gets the routes for the given groups
 * @param {RouteGroup} groups groups to provide routes for, either array of RouteGroup or single RouteGroup
 * @param {MapConnection} connection MapConnection to use
 * @param {boolean} handleConnection should the connection be handled by this function (open and close)
 * @returns list of routes and their info, grouped by the groups given
 */
export async function getRoutesByGroup(groups, connection = new MapConnection(), handleConnection = true) {
    if (handleConnection) await connection.connect();

    var routeGroups = {}
    
    // make sure groups is an array
    if (!Array.isArray(groups)) {
        groups = [groups]
    }

    for (var group in groups) {
        group = groups[group]
        routeGroups[group] = connection.send("GetRoutesByGroup", [group])
    }

    // make sure all promises are resolved
    for (var group in routeGroups) {
        routeGroups[group] = await routeGroups[group]
    }

    for (var group in routeGroups) {
        routeGroups[group].forEach((route) => {
            route.routeInfo = getRouteInfo(route.key, connection, false)
            route.patternPoints = getRoutePatternPoints(route.key, connection, false)
        })
    }

    // resolve all extended data promises
    for (var group in routeGroups) {
        for (var route in routeGroups[group]) {
            routeGroups[group][route].routeInfo = await routeGroups[group][route].routeInfo
            routeGroups[group][route].patternPoints = await routeGroups[group][route].patternPoints
        }
    }

    if (handleConnection) connection.close()

    return routeGroups
}

/**
 * 
 * @param {String} routeName the short name of the route to get (e.g. 47-48, 04, etc)
 * @param {MapConnection} connection MapConnection to use
 * @param {boolean} handleConnection should the connection be handled by this function (open and close)
 * @returns 
 */
export async function getRouteByName(routeName, connection = new MapConnection(), handleConnection = true) {
    if (handleConnection) await connection.connect();

    var route = await connection.send("GetRoute", [routeName])
    route.routeInfo = await getRouteInfo(route.key, connection, false)
    route.patternPoints = await getRoutePatternPoints(route.key, connection, false)

    if (handleConnection) connection.close()

    return route
}

/**
 * Gets the extended route info for a given route key
 * This is automatically called by getRoutesByGroup and getRoutesByName and is returned in the routeInfo field
 * @param {String} routeKey key of the route to get info for
 * @param {MapConnection} connection MapConnection to use
 * @param {boolean} handleConnection should the connection be handled by this function (open and close)
 * @returns extended route info, includes: waypoints, stops, and route color
 */
export async function getRouteInfo(routeKey, connection = new MapConnection(), handleConnection = true) {
    if (handleConnection) await connection.connect()

    var routeInfo = await connection.send("GetPatternPaths", [routeKey])

    if (handleConnection) connection.close()
    return routeInfo
}

/**
 * Gets the extended route pattern point info for a given route key
 * This is automatically called by getRoutesByGroup and getRoutesByName and is returned in the patternPoints field
 * @param {String} routeKey key of the route to get info for
 * @param {MapConnection} connection MapConnection to use
 * @param {boolean} handleConnection should the connection be handled by this function (open and close)
 * @returns extended route info, includes: map color and icon info and extendied direction info
 */
export async function getRoutePatternPoints(routeKey, connection = new MapConnection(), handleConnection = true) {
    if (handleConnection) await connection.connect()

    var patternPoints = await connection.send("GetPatternPoints", [routeKey])

    if (handleConnection) connection.close()
    return patternPoints
}

/**
 * Gets the active busses on the route given
 * @param {String} routeName the short name of the route to get busses for (e.g. 47-48, 04, etc)
 * @param {MapConnection} connection MapConnection to use
 * @param {boolean} handleConnection should the connection be handled by this function (open and close)
 * @returns an array of bus information for the active busses on the route
 */
export async function getRouteBuses(routeName, connection = new MapConnection(), handleConnection = true) {
    if (handleConnection) await connection.connect()

    var busses = await connection.send("GetBuses", [routeName])

    if (handleConnection) connection.close()
    return busses
}

