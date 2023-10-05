import { MapConnection, TimetableConnection } from "./connection.js";

export const RouteGroup = {
    ON_CAMPUS: "OnCampus",
    OFF_CAMPUS: "OffCampus",
    GAMEDAY: "Gameday",
    ALL: ["OnCampus", "OffCampus", "Gameday"]
}

function mergeResults(results) {
    var results_merged = []

    if (results.length == 1) {
        return results[0].result
    }

    results.forEach((result) => {
        results_merged = results_merged.concat(result.result)
    })

    return results_merged
}

export async function getRoutes(group) {
    const connection = new MapConnection();
    await connection.connect();

    var routeGroups = []
    
    if (!Array.isArray(group)) {
        group = [group]
    }

    group.forEach((group) => {
        routeGroups.push(connection.send("GetRoutesByGroup", [group]))
    })

    var allRoutes = await Promise.all(routeGroups)
    connection.close()

    return mergeResults(allRoutes)
}

export async function getRouteInfo(route) {
    const connection = new MapConnection();
    await connection.connect();

    var routeInfo = []

    if (!Array.isArray(route)) {
        route = [route]
    }

    route.forEach((route) => {
        routeInfo.push(connection.send("GetPatternPaths", [route.key]))
    })

    var allRouteInfo = await Promise.all(routeInfo)

    connection.close()

    return mergeResults(allRouteInfo)
}

