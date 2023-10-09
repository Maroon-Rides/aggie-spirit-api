import { MapConnection, TimetableConnection } from "./connection.js";

/**
 * The possible groups of routes to retrieve with getRoutes
 */
export const RouteGroup = {
    ON_CAMPUS: "OnCampus",
    OFF_CAMPUS: "OffCampus",
    GAMEDAY: "Gameday",
    ALL: ["OnCampus", "OffCampus", "Gameday"]
}


/**
 * Gets the busses under a specific group. Use the RouteGroup enum to specify the group
 * @param {RouteGroup} group 
 * @returns the busses under the group specified
 */
export async function getRoutesByGroup(groups) {
    const connection = new MapConnection();
    await connection.connect();

    var routeGroups = {}
    
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
            route.routeInfo = connection.send("GetPatternPaths", [route.key])
        })
    }

    // resolve all .routeInfo promises
    for (var group in routeGroups) {
        for (var route in routeGroups[group]) {
            routeGroups[group][route].routeInfo = await routeGroups[group][route].routeInfo
        }
    }

    connection.close()

    return routeGroups
}

/**
 * Gets the extended route info for a given route key
 * Includes: waypoints, stops, and route color
 * @param {String} routeKey 
 * @returns either an array of route info or a single route info object based on the routeKey
 */
export async function getRouteInfo(routeKey) {
    const connection = new MapConnection();
    await connection.connect();

    var routeInfo = []

    if (!Array.isArray(routeKey)) {
        routeKey = [routeKey]
    }

    routeKey.forEach((key) => {
        routeInfo.push(connection.send("GetPatternPaths", [key]))
    })

    var allRouteInfo = await Promise.all(routeInfo)

    connection.close()

    return mergeResults(allRouteInfo)
}

/**
 * Gets the active busses on the given route name
 * @param {String} routeName 
 * @returns the busses and locations for the given route name
 */
export async function getRouteBusses(routeName) {
    const connection = new MapConnection();
    await connection.connect();

    var busses = []

    if (!Array.isArray(routeName)) {
        routeName = [routeName]
    }

    routeName.forEach((routeName) => {
        busses.push(connection.send("GetBuses", [routeName]))
    })

    var allBusses = await Promise.all(busses)

    connection.close()

    return mergeResults(allBusses)
}

