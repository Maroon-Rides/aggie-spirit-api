import { getAuthentication } from "./connection.js"
import moment from "moment"

export async function getActiveRoutes(auth = null) {
    auth = auth || await getAuthentication()

    var res = await fetch("https://aggiespirit.ts.tamu.edu/Home/GetActiveRoutes", {
        method: "POST",
        headers: {
            "cookie": auth
        }
    })
    
    return await res.json()
}

//

export async function getNearbyRoutes(favRoutes = [], latitude = 30.6138, longitude = -96.3395, maxRadius = null, minRadius = null, auth = null) {
    auth = auth || await getAuthentication()

    var payload = {
        "latitude": latitude,
        "longitude": longitude,
        "minRadius": minRadius,
        "maxRadius": maxRadius,
        "favouriteRoutes": favRoutes
    }

    var res = await fetch("https://aggiespirit.ts.tamu.edu/Home/GetNearbyRoutes", {
        method: "POST",
        headers: {
            "cookie": auth,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await res.json()
}

async function getNextStopTimes(routes, auth = null) {
    auth = auth || await getAuthentication()

    var payload = {
        routes: routes
    }

    var res = await fetch("https://aggiespirit.ts.tamu.edu/Home/GetNextStopTimes", {
        method: "POST",
        headers: {
            "cookie": auth,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    return await res.json()
}

export async function getStopSchedules(stopCode, date, auth = null) {
    auth = auth || await getAuthentication()

    date = moment(date).format("YYYY-MM-DD")

    var payload = {
        stopCode: stopId,
        date: date
    }

    var res = await fetch("https://aggiespirit.ts.tamu.edu/Home/GetStopSchedules", {
        method: "POST",
        headers: {
            "cookie": auth,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    return await res.json()
}

export async function getStopEstimates(stopCode, date, auth = null) {
    auth = auth || await getAuthentication()

    date = moment(date).format("YYYY-MM-DD")

    var payload = {
        stopCode: stopId,
        date: date
    }

    var res = await fetch("https://aggiespirit.ts.tamu.edu/Home/GetStopSchedules", {
        method: "POST",
        headers: {
            "cookie": auth,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    return await res.json()
}

