import { MapConnection } from "./connection.js";

/**
 * The possible groups of routes to retrieve with getRoutesByGroup
 */
export const RouteGroup = {
    ON_CAMPUS: "OnCampus",
    OFF_CAMPUS: "OffCampus",
    GAMEDAY: "Gameday",
    ALL: ["OnCampus", "OffCampus", "Gameday"]
}

async function prepareConnection(connection) {
    var conn // connection to use in function

    if (connection == undefined) {
        conn = new MapConnection()
        await conn.connect()
    } else {
        conn = connection
    }

    return conn
}


/**
 * Gets the routes for the given groups
 * @param {RouteGroup} groups groups to provide routes for, either array of RouteGroup or single RouteGroup
 * @param {MapConnection} connection MapConnection to use
 * @returns list of routes and their info, grouped by the groups given
 */
export async function getRoutesByGroup(groups, connection) {
    const conn = await prepareConnection(connection) // connection to use in function

    var routeGroups = {}

    // make sure groups is an array
    if (!Array.isArray(groups)) {
        groups = [groups]
    }

    for (var group in groups) {
        group = groups[group]
        routeGroups[group] = conn.send("GetRoutesByGroup", [group])
    }

    // make sure all promises are resolved
    for (var group in routeGroups) {
        routeGroups[group] = await routeGroups[group]
    }

    for (var group in routeGroups) {
        routeGroups[group].forEach((route) => {
            route.routeInfo = getRouteInfo(route.key, connection, false)
            route.routePatterns = getRoutePatterns(route.key, connection, false)
        })
    }

    // resolve all extended data promises
    for (var group in routeGroups) {
        for (var route in routeGroups[group]) {
            routeGroups[group][route].routeInfo = await routeGroups[group][route].routeInfo
            routeGroups[group][route].patternPoints = await routeGroups[group][route].patternPoints
        }
    }

    if (connection == undefined) connection.close()

    return routeGroups
}

/**
 * 
 * @param {String} routeName the short name of the route to get (e.g. 47-48, 04, etc)
 * @param {MapConnection} connection MapConnection to use
 * @returns 
 */
export async function getRouteByName(routeName, connection) {
    const conn = await prepareConnection(connection) // connection to use in function

    var route = await conn.send("GetRoute", [routeName])
    route.routeInfo = getRouteInfo(route.key, connection, false)
    route.routePatterns = getRoutePatterns(route.key, connection, false)

    // resolve all extended data promises
    route.routeInfo = await route.routeInfo
    route.routePatterns = await route.routePatterns

    if (connection == undefined) conn.close()

    return route
}

/**
 * Gets the extended route info for a given route key
 * This is automatically called by getRoutesByGroup and getRoutesByName and is returned in the routeInfo field
 * @param {String} routeKey key of the route to get info for
 * @param {MapConnection} connection MapConnection to use
 * @returns extended route info, includes: waypoints, stops, and route color
 */
export async function getRouteInfo(routeKey, connection) {
    const conn = await prepareConnection(connection) // connection to use in function

    var routeInfo = await conn.send("GetPatternPaths", [routeKey])

    if (connection == undefined) conn.close()
    return routeInfo
}

/**
 * Gets the extended route pattern point info for a given route key
 * This is automatically called by getRoutesByGroup and getRoutesByName and is returned in the routePattern field
 * @param {String} routeKey key of the route to get info for
 * @param {MapConnection} connection MapConnection to use
 * @returns extended route info, includes: map color and icon info and extendied direction info
 */
export async function getRoutePatterns(routeKey, connection) {
    const conn = await prepareConnection(connection) // connection to use in function

    var routePatterns = await conn.send("GetRoutePatterns", [routeKey])
    if (connection == undefined) conn.close()
    return routePatterns
}

/**
 * Gets the active busses on the route given
 * @param {String} routeName the short name of the route to get busses for (e.g. 47-48, 04, etc)
 * @param {MapConnection} connection MapConnection to use
 * @returns an array of bus information for the active busses on the route
 */
export async function getRouteBuses(routeName, connection) {
    const conn = await prepareConnection(connection) // connection to use in function

    var busses = await conn.send("GetBuses", [routeName])

    if (connection == undefined) conn.close()
    return busses
}
