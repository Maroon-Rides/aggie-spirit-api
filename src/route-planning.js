/**
 * Get matching bus stops for search query
 * @param {string} query search query
 * @param {string} auth authentication to use for the request
 * @returns list of bus stops that match the search query
 */
export async function findBusStops(query, auth) {
    var res = await fetch(`https://aggiespirit.ts.tamu.edu/Home/FindBusStops?searchTerm=${encodeURIComponent(query)}`, {
        headers: {
            "cookie": auth,
            "Accept": "application/json, text/javascript, */*; q=0.01"
        }
    })
    
    return await res.json()
}

/**
 * Get matching bus stops for search query
 * @param {string} query search query
 * @param {string} auth authentication to use for the request
 * @returns list of bus stops that match the search query
 */
export async function getTripPlan(query, auth) {

}