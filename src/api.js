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
 * @returns list of routes and their info, grouped by the groups given
 */
export async function getRoutesByGroup(groups, connection = 0) {
    var conn // connection to use in function

    if (connection == 0) {
        conn = new MapConnection()
        await conn.connect()
    } else {
        conn = connection
    }

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

    if (connection == 0) connection.close()

    return routeGroups
}

/**
 * 
 * @param {String} routeName the short name of the route to get (e.g. 47-48, 04, etc)
 * @param {MapConnection} connection MapConnection to use
 * @returns 
 */
export async function getRouteByName(routeName, connection = 0) {
    var conn // connection to use in function

    if (connection == 0) {
        conn = new MapConnection()
        await conn.connect()
    } else {
        conn = connection
    }

    var route = await conn.send("GetRoute", [routeName])
    route.routeInfo = await getRouteInfo(route.key, connection, false)
    route.patternPoints = await getRoutePatternPoints(route.key, connection, false)

    if (connection == 0) conn.close()

    return route
}

/**
 * Gets the extended route info for a given route key
 * This is automatically called by getRoutesByGroup and getRoutesByName and is returned in the routeInfo field
 * @param {String} routeKey key of the route to get info for
 * @param {MapConnection} connection MapConnection to use
 * @returns extended route info, includes: waypoints, stops, and route color
 */
export async function getRouteInfo(routeKey, connection = 0) {
    var conn // connection to use in function

    if (connection == 0) {
        conn = new MapConnection()
        await conn.connect()
    } else {
        conn = connection
    }

    var routeInfo = await conn.send("GetPatternPaths", [routeKey])

    if (connection == 0) conn.close()
    return routeInfo
}

/**
 * Gets the extended route pattern point info for a given route key
 * This is automatically called by getRoutesByGroup and getRoutesByName and is returned in the patternPoints field
 * @param {String} routeKey key of the route to get info for
 * @param {MapConnection} connection MapConnection to use
 * @returns extended route info, includes: map color and icon info and extendied direction info
 */
export async function getRoutePatternPoints(routeKey, connection = new MapConnection(true)) {
    var conn // connection to use in function

    if (connection == 0) {
        conn = new MapConnection()
        await conn.connect()
    } else {
        conn = connection
    }

    var patternPoints = await conn.send("GetPatternPoints", [routeKey])

    if (connection == 0) conn.close()
    return patternPoints
}

/**
 * Gets the active busses on the route given
 * @param {String} routeName the short name of the route to get busses for (e.g. 47-48, 04, etc)
 * @param {MapConnection} connection MapConnection to use
 * @returns an array of bus information for the active busses on the route
 */
export async function getRouteBuses(routeName, connection = new MapConnection()) {
    var conn // connection to use in function

    if (connection == 0) {
        conn = new TimetableConnection()
        await conn.connect()
    } else {
        conn = connection
    }

    var busses = await conn.send("GetBuses", [routeName])

    if (connection == 0) conn.close()
    return busses
}

/**
 * Retrieves the timetable for the given route name and date
 * @param {String} routeName name of the route to get the timetable for, can be an array of route names
 * @param {Date} date date to get the timetable for, defaults to current date
 * @param {TimetableConnection} connection TimetableConnection to use
 * @returns the timetable(s) for the given route name and date, if there is no timetable for the given date, an empty array is returned
 */
export async function getTimetable(routeName, date = new Date(), connection = new TimetableConnection(true)) {
    var conn // connection to use in function

    if (connection == 0) {
        conn = new TimetableConnection()
        await conn.connect()
    } else {
        conn = connection
    }

    // convert Date to momentjs object
    date = moment(date.toISOString()).format("YYYY-MM-DD")

    var timetableResponse = await conn.send("GetTimeTable", [routeName, date])

    if (connection == 0) conn.close()

    // start parsing the timetable HTML
    var parser = new DomParser();

    var timetableFinal = []

    // check if the bus is not running on the given date
    if (timetableResponse.jsonTimeTableList[0].html.includes("No Service Is Scheduled For This Date")) return timetableFinal

    // go through each timetable
    timetableResponse.jsonTimeTableList.forEach((table) => {
        // parse the timetable html
        var dom = parser.parseFromString("<table id='table'>" + table.html + "</table>")

        // get the table
        const t = dom.getElementsByTagName("table")[0]

        // get all rows and cells from table
        const rows = t.getElementsByTagName("tr")

        var parsedTable = {}

        // get all stop names from table
        var stops = rows[0].getElementsByTagName("th").map((stop) => {
            parsedTable[stop.innerHTML] = []
            return stop.innerHTML
        })

        // get all times for each stop
        for (var i=1; i < rows.length; i++) {
            rows[i].getElementsByTagName("time").map((time, i) => {
                parsedTable[stops[i]].push(new Date(time.getAttribute("dateTime")))
            })
        }

        timetableFinal.push(parsedTable)
    })

    return timetableFinal
}