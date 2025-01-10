import { Auth, Endpoint, FoundLocation, FoundStop, TripPlan } from "./types";

/**
 * Get matching bus stops for search query
 * @param {string} query search query
 * @param {string} auth authentication to use for the request
 * @returns list of bus stops that match the search query
 */
export async function findBusStops(query: string, auth: Auth): Promise<FoundStop[]> {
    var res = await fetch(`https://aggiespirit.ts.tamu.edu/Home/FindBusStops?searchTerm=${encodeURIComponent(query)}`, {
        headers: {
            ...auth,
            "Accept": "application/json, text/javascript, */*; q=0.01"
        }
    })
    
    return await res.json()
}

/**
 * Get matching bus stops for search query
 * @param {Endpoint} origin search query
 * @param {Endpoint} destination search query
 * @param {Date?} arriveTime time to arrive at destination
 * @param {Date?} departTime time to depart from origin
 * @returns trip plan for the given origin and destination
 */

export async function getTripPlan(
    auth: Auth,
    origin: Endpoint, 
    destination: Endpoint, 
    routeOption: number,
    arriveTime?: Date, 
    departTime?: Date
): Promise<TripPlan> {
    const query = {
        origin: origin.title,
        originName1: origin.title,
        originName2: origin.subtitle,
        originLatitude: origin.lat ?? "",
        originLongitude: origin.long ?? "",
        originStopCode: origin.stopCode ?? "",
        originPlaceId: origin.placeId ?? "",
        originFavourited: false,
        originGeolocation: false,

        destination: destination.title,
        destinationName1: destination.title,
        destinationName2: destination.subtitle,
        destinationLatitude: destination.lat ?? "",
        destinationLongitude: destination.long ?? "",
        destinationStopCode: destination.stopCode ?? "",
        destinationPlaceId: destination.placeId ?? "",
        destinationFavourited: false,
        destinationGeolocation: false,

        arriveTime: arriveTime && (arriveTime.getTime() / 1000).toFixed(0),
        departTime: departTime && (departTime.getTime() / 1000).toFixed(0),
        routeOption: routeOption,
        isOriginStopCodeValid: true,
        isDestinationStopCodeValid: true,
        lang: null
    }

    var res = await fetch(`https://aggiespirit.ts.tamu.edu/TripPlanner/GetTripPlan`, {
        method: "POST",
        headers: {
            ...auth,
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
    });
    return await res.json();
}
