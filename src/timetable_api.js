import moment from "moment";
import DomParser from "dom-parser"
import { TimetableConnection } from "./connection.js";

/**
 * Retrieves the timetable for the given route name and date
 * @param {String} routeName name of the route to get the timetable for, can be an array of route names
 * @param {Date} date date to get the timetable for, defaults to current date
 * @param {TimetableConnection} connection TimetableConnection to use
 * @returns the timetable(s) for the given route name and date, if there is no timetable for the given date, an empty array is returned
 */
export async function getTimetable(routeName, date = new Date(), connection) {
    var conn // connection to use in function

    if (connection == undefined) {
        conn = new TimetableConnection()
        await conn.connect()
    } else {
        conn = connection
    }

    // convert Date to momentjs object
    date = moment(date.toISOString()).format("YYYY-MM-DD")

    var timetableResponse = await conn.send("GetTimeTable", [routeName, date])

    if (connection == undefined) conn.close()

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