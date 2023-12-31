import { getAuthentication } from "./connection.js"

/**
 * Get the initial data for the map
 * @param {string} auth authentication to use for the request
 * @returns base data for the map
 */
export async function getBaseData(auth) {
    var res = await fetch("https://aggiespirit.ts.tamu.edu/RouteMap/GetBaseData", {
        method: "POST",
        headers: {
            "cookie": auth
        }
    })
    
    return await res.json()
}

/**
 * Gets the route info for given route(s)
 * @param {[string]} patternIds route ids to get info for
 * @param {string} auth authentication to use for the request
 * @returns route info for the given route(s)
 */
export async function getPatternPaths(patternIds, auth) {
    var form = new URLSearchParams()
    patternIds.forEach((id) => {
        form.append("routeKeys[]", id)
    })


    var res = await fetch("https://aggiespirit.ts.tamu.edu/RouteMap/GetPatternPaths", {
        method: "POST",
        headers: {
            "cookie": auth,
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: form
    })
    
    return await res.json()
}

/**
 * Get the active vehicles on given route(s)
 * @param {[string]} patternIds 
 * @param {*} auth authentication to use for the request
 * @returns list of active vehicles on the given route(s)
 */
export async function getVehicles(patternIds, auth) {
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

