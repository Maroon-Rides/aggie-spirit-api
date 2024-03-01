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
 * Get matching locations for search query
 * @param {string} query search query
 * @param {string} gAuth google api authentication to use for the request
 * @returns list of locations that match the search query
 */
export async function findLocations(query, gAuth) {
    const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
    const params = {
        input: query,
        key: gAuth,
        types: 'geocode'
    };

    // convert params to query string without URLSearchParams
    let queryString = '';
    for (const key in params) {
        queryString += `${key}=${params[key]}&`;
    }

    const response = await fetch(url + '?' + queryString);
    const data = await response.json();

    return data.predictions;  
}

/**
 * Get matching bus stops for search query
 * @param {Endpoint} origin search query
 * @param {Endpoint} destination search query
 * @param {Date?} arriveTime time to arrive at destination
 * @param {Date?} departTime time to depart from origin
 * @returns trip plan for the given origin and destination
 */
export async function getTripPlan(origin, destination, arriveTime, departTime, auth) {
    const query = {
        origin: origin.title,
        originName1: origin.title,
        originName2: origin.subtitle,
        originLatitude: origin.lat,
        originLongitude: origin.long,
        originStopCode: origin.stopCode,
        originPlaceId: origin.placeId,
        originFavourited: false,
        originGeolocation: false,

        destination: destination.title,
        destinationName1: destination.title,
        destinationName2: destination.subtitle,
        destinationLatitude: destination.lat,
        destinationLongitude: destination.long,
        destinationStopCode: destination.stopCode,
        destinationPlaceId: destination.placeId,
        destinationFavourited: false,
        destinationGeolocation: false,

        arriveTime: arriveTime && arriveTime.getTime() / 1000,
        departTime: departTime && departTime.getTime() / 1000,
        isOriginStopCodeValid: true,
        isDestinationStopCodeValid: true,
        lang: null
    }

    const queryStr = Object.keys(query).map(key => {
        if (!query[key]) return "";
        return `${key}=${query[key]}`;
    }).join('&');
    
    var res = await fetch(`https://aggiespirit.ts.tamu.edu/TripPlanner/GetTripPlan?${queryStr}`, {
        headers: {
            "Cookie": auth,
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/json"
        }
    })
}