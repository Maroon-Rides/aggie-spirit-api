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
 * Flattens the results from the API into a single array without unnecessary data
 * If a single result is passed in, it is returned without modification
 * @param {any} results 
 * @returns merged results from the API
 */
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

/**
 * Gets the busses under a specific group. Use the RouteGroup enum to specify the group
 * @param {RouteGroup} group 
 * @returns the busses under the group specified
 */
export async function getRoutesByGroup(group) {
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
 * @returns the timetable(s) for the given route name and date
 */
export async function getTimetable(routeName, date = new Date()) {
    const connection = new TimetableConnection();
    await connection.connect();

    var timetable = []

    if (!Array.isArray(routeName)) {
        routeName = [routeName]
    }

    // convert Date to momentjs object
    date = moment(date).format("YYYY-MM-DD")

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

    mergedTimetables.forEach((timetable) => {
        var tFinal = []
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
