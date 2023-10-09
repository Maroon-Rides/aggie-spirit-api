import { MapConnection, TimetableConnection } from "./connection.js";
import moment from "moment";
import DomParser from "dom-parser"


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
 * @returns the bus information for the active busses on the route
 */
export async function getRouteBusses(routeName, connection = new MapConnection(), handleConnection = true) {
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

/**
 * Retrieves the timetable for the given route name and date
 * @param {String} routeName name of the route to get the timetable for, can be an array of route names
 * @param {Date} date date to get the timetable for, defaults to current date
 * @returns the timetable(s) for the given route name and date, if there is no timetable for the given date, an empty array is returned
 */
export async function getTimetable(routeName, date = new Date()) {
    const connection = new TimetableConnection();
    await connection.connect();

    var timetable = []

    if (!Array.isArray(routeName)) {
        routeName = [routeName]
    }

    // convert Date to momentjs object
    date = moment(date.toISOString()).format("YYYY-MM-DD")

    routeName.forEach((routeName) => {
        timetable.push(connection.send("GetTimeTable", [routeName, date]))
    })

    var allTimetables = await Promise.all(timetable)
    connection.close()

    var mergedTimetables = []
    allTimetables.forEach((result) => {
        mergedTimetables = mergedTimetables.concat(result.result)
    })


    // start parsing the timetable HTML
    var parser = new DomParser();

    var returnTable = []

    // go through each bus
    mergedTimetables.forEach((timetable) => {
        var tFinal = []

        // check if the bus is not running on the given date
        if (timetable.jsonTimeTableList[0].html.includes("No Service Is Scheduled For This Date")) return tFinal

        // go through each timetable
        timetable.jsonTimeTableList.forEach((table) => {
            var dom = parser.parseFromString("<table id='table'>" + table.html + "</table>")
            const t = dom.getElementsByTagName("table")[0]

            // get all rows and cells from table
            const rows = t.getElementsByTagName("tr")

            var parsedTable = {}

            var stops = rows[0].getElementsByTagName("th").map((stop) => {
                parsedTable[stop.innerHTML] = []
                return stop.innerHTML
            })

            for (var i=1; i < rows.length; i++) {
                rows[i].getElementsByTagName("time").map((time, i) => {
                    parsedTable[stops[i]].push(new Date(time.getAttribute("dateTime")))
                })
            }
            tFinal.push(parsedTable)
        })
        returnTable.push(tFinal)
    })

    if (returnTable.length == 1) {
        returnTable = returnTable[0]
    }

    return returnTable

}
