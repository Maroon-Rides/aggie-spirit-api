import { getAuthentication } from "./connection.js"

export async function getBaseData(auth = null) {
    auth = auth || await getAuthentication()
    var res = await fetch("https://aggiespirit.ts.tamu.edu/RouteMap/GetBaseData", {
        method: "POST",
        headers: {
            "cookie": auth
        }
    })
    
    return await res.json()
}

export async function getPatternPaths(patternIds, auth = null) {
    auth = auth || await getAuthentication()

    var form = new URLSearchParams()
    patternIds.forEach((id) => {
        form.append("routeKeys[]", id)
    })


    var res = await fetch("https://aggiespirit.ts.tamu.edu/RouteMap/GetPatternPaths", {
        method: "POST",
        headers: {
            "cookie": auth
        },
        body: form
    })
    
    return await res.json()
}

export async function getVehicles(patternIds, auth = null) {
    auth = auth || await getAuthentication()

    var form = new URLSearchParams()
    patternIds.forEach((id) => {
        form.append("routeKeys[]", id)
    })


    var res = await fetch("https://aggiespirit.ts.tamu.edu/RouteMap/GetPatternPaths", {
        method: "POST",
        headers: {
            "cookie": auth
        },
        body: form
    })
    
    return await res.json()
}

