import { MapConnection, TimetableConnection } from "./connection.js";
import moment from "moment";
import DomParser from "dom-parser"


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
