// Type Definitions: API Return Data
declare module 'aggie-spirit-api' {
    export interface MapPattern {
        key: string
        isDisplay: boolean
    }
    
    export interface MapDirection {
        key: string
        name: string
    }
    
    export interface MapDirectionList {
        direction: MapDirection
        destination: string
        lineColor: string
        textColor: string
        patternList: MapPattern[]
        serviceInterruptionKeys: number[]
    }
    
    export interface MapStop {
        name: string
        stopCode: string
        stopType: number
    }

    export interface MapPatternPoint {
        key: string
        latitude: number
        longitude: number
        stop: MapStop | null
    }

    export interface MapPatternPath {
        patternKey: string
        directionKey: string
        patternPoints: MapPatternPoint[]
        segmentPaths: any[] // Always blank... leaving any for now
    }

    export interface MapRoute {
        key: string
        name: string
        shortName: string
        directionList: MapDirectionList[]
    }
    
    export interface MapServiceInterruption {
        key: string
        name: string
        description: string
        timeRangeString: string
        startDateUtc: string
        endDateUtc: string
        dailyStartTime: string
        dailyEndTime: string
    }

    export interface DepartureTime {
        estimatedDepartTimeUtc: string | null
        scheduledDepartTimeUtc: string | null
        isOffRoute: boolean
    }
    
    export interface RouteDirectionTime {
        directionKey: string
        frequencyInfo?: any // Always blank... leaving any for now
        nextDeparts: DepartureTime[]
        routeKey: string
    }

    export interface BusLocation {
        heading: number
        lastGpsDate: string
        latitude: number
        longitude: number
        speed: number
    }

    export interface Amenity {
        name: string
        iconName: string
    }
    
    export interface Vehicle {
        amenities: Amenity[]
        directionKey: string
        directionName: string
        isExtraTrip: boolean
        key: string
        location: BusLocation
        name: string
        passengerCapacity: number
        passengersOnboard: number
        routeKey: string
    }

    export interface VehicleByDirection {
        directionKey: string
        vehicles: Vehicle[]
    }

    export interface NextStopTime {
        estimatedDepartTimeUtc: string | null
        scheduledDepartTimeUtc: string | null
        isOffRoute: boolean
        isRealtime: boolean
    }

    export interface TimetableServiceInterruption {
        externalServiceInterruptionKey: string
        serviceInterruptionName: string
        serviceInterruptionTimeRange: string
        isStopClosed: boolean
    }

    export interface TimetableNearbyStops {
        directionKey: string
        directionName: string
        distance: number
        stopCode: string
        stopName: string | null
        isTemporary: boolean
        nextStopTimes: NextStopTime[]
        frequencyInfo: any | null // Always blank... leaving any for now
        serviceInterruptions: TimetableServiceInterruption[]
        amenities: Amenity[]
    }

    export interface TimetableRoute {
        routeKey: string
        routeNumber: string | null
        routeName: string | null
        distanceString: string | null
        distance: number | null
        nearbyStops: TimetableNearbyStops[]
    }

    export interface BaseDataResponse {
        routes: MapRoute[]
        serviceInterruptions: MapServiceInterruption[]
    }
    
    export interface PatternPathsResponse {
        routeKey: string
        patternPaths: MapPatternPath[]
        vehiclesByDirections: VehicleByDirection[]
    }
    
    export interface NextDepartureTimesResponse {
        amenities: Amenity[]
        routeDirectionTimes: RouteDirectionTime[]
        stopCode: string
    }
    
    export interface VehicleResponse {
        routeKey: string
        vehiclesByDirections: VehicleByDirection[]
    }

    export interface StopTime {
        scheduledDepartTimeUtc: string
        estimatedDepartTimeUtc: string | null
        isRealtime: boolean
        tripPointId: string
        isLastPoint: boolean | null
        isCancelled: boolean
        isOffRoute: boolean
    }

    export interface RouteStopSchedule {
        routeName: string
        routeNumber: string
        directionName: string
        stopTimes: StopTime[]
        frequencyInfo: any
        hasTrips: boolean
        hasSchedule: boolean
        isEndOfRoute: boolean
        isTemporaryStopOnly: boolean
        isClosedRegularStop: boolean
        serviceInterruptions: any | null
    }

    export interface StopEstimatesResponse {
        amenities: Amenity[]
        date: string
        routeStopSchedules: RouteStopSchedule[] // TODO: determine datatype
    }

    export interface StopSchedulesResponse {
        amenities: Amenity[]
        date: string
        routeStopSchedules: RouteStopSchedule[] // TODO: determine datatype
    }

    export interface NearbyRoutesResponse {
        longitude: number,
        latutude: number,
        stopCode: any, // always blank... leaving any for now
        busStopRouteResults: any[], // always blank... leaving [any] for now
        routeResults: TimetableRoute[],
        nextMinRadius: number,
        nextMaxRadius: number,
        canLoadMore: boolean
    }

    export interface FoundStop {
        stopCode: string
        stopName: string
        longitude: number
        latitude: number
    }

    export interface MatchedSubstring {
        length: number
        offset: number
    }

    export interface LocationTerms {
        offset: number
        value: string
    }

    export interface FoundLocation {
        description: string
        matchedSubstrings: MatchedSubstring[]
        place_id: string
        reference: string
        structured_formatting: {
            main_text: string
            main_text_matched_substrings: MatchedSubstring[]
            secondary_text: string
        }
        terms: LocationTerms[]
        types: string[]
    }
    
    export interface Endpoint {
        title: string
        title: string
        subtitle: string
        lat?: number
        long?: number
        stopCode?: string
        placeId?: string
    }

    export interface PlanBlock {
        className: string
        iconString: string
        leftPosition: number
        routeShortName: string
        stepType: number
        topPosition: number
        width: number
    }

    export interface ChartLinePosition {
        leftPosition: number
        timeLabel: string
    }

    export interface OptionBlock {
        leavingIn: string
        leftPosition: number
        topPosition: number
        totalMinute: string
        width: number
    }

    export interface InstructionStep {
        className: string
        duration: string
        iconClassName: string | null
        instructions: string
        latitude: number
        longitude: number
        polyline: string
        routeShortName: string | null
        startTime: string
        stepType: number
        walkingInstructions: {
            index: number
            instruction: string
            polyline: string
        }[]
    }
    
    export interface OptionDetail {
        agencies: {
            agencyName: string
            agencyUrl: string | undefined
        }[]
        copyrights: string
        endTime: number
        endTimeText: string
        instructions: InstructionStep[]
        mapBounds: {
            neLatitude: number
            neLongitude: number
            swLatitude: number
            swLongitude: number
        }
        optionIndex: number
        startTime: number
        startTimeText: string
        totalTime: string
        totalWalkingDistance: string
        totalWalkingTime: string
        warnings: string[]
    }

    export interface OptionPosition {
        optionIndex: number
        optionSummary: string
        topPosition: number
    }

    export interface TripPlan {
        blocks: PlanBlock[]
        chartHeight: number
        chartLinePositions: ChartLinePosition[] | null
        headerHeight: number
        optionBlocks: OptionBlock[]
        optionDetails: OptionDetail[] 
        optionHeight: number
        optionPositions: OptionPosition[]
        resultCount: number
    }


    // Type Definitions: src/connection.js
    
    /**
     * Retreives API authentication information for the endpoints.
     * auth must be passed to each function int he `auth` parameter.
     * If no auth is passed, the function will attempt to retreive it.
     * @returns {string} - the header for authentication
     */
    export function getAuthentication(): Promise<string>
    
    
    
    // Type Definitions: src/home.js
    
    /**
     * Get the currently active routes
     * @param {string} auth Authentication to use for the request
     * @returns {string[]} list of route names ("01", "04", etc.)
     */
    export function getActiveRoutes(auth?: string): Promise<string[]>
    
    /**
     * Gets the nearby routes for a given location, with optional radius
     * @param {string[]} favRoutes list of favorited routes
     * @param {number} latitude GPS latitude
     * @param {number} longitude GPS longitude
     * @param {number} maxRadius max radius to search
     * @param {number} minRadius min radius to search
     * @param {string} auth authentication to use for the request
     * @returns list of routes that satisy given constraints
     */
    export function getNearbyRoutes(
                                        favRoutes: string[], 
                                        latitude: number, 
                                        longitude: number, 
                                        maxRadius?: number, 
                                        minRadius?: number, 
                                        auth?: string
                                    ): Promise<NearbyRoutesResponse>
    
    /**
     * get the next stop times for a given route(s)
     * @param {string[]} routes route ids to get stop times for
     * @param {string} auth authentication to use for the request
     * @returns list of stop times for the given routes
     */
    export function getNextStopTimes(routes: string[], auth?: string): Promise<TimetableRoute[]>
    
    /**
     * Gets the schedules for a given stops(s)
     * @param {string} stopCode list of stop ids to get schedules for
     * @param {Date} date date to get schedules for
     * @param {string} auth authentication to use for the request
     * @returns list of schedules for the given stops
     */
    export function getStopSchedules(stopCode: string, date: Date, auth?: string): Promise<StopSchedulesResponse>
     
    /**
     * Gets the schedule estimates for a given stops(s)
     * @param {string} stopCode list of stop ids to get schedules for
     * @param {Date} date date to get schedules for
     * @param {string} auth authentication to use for the request
     * @returns list of schedules for the given stops
     */
    export function getStopEstimates(stopCode: string, date: Date, auth?:string): Promise<StopEstimatesResponse>
    
    
    
    // Type Definitions: src/map.js
    
    /**
     * Get the initial data for the map
     * @param {string} auth authentication to use for the request
     * @returns base data for the map
     */
    export function getBaseData(auth?: string): Promise<BaseDataResponse>
    
    /**
     * Gets the route info for given route(s)
     * @param {string[]} patternIds route ids to get info for
     * @param {string} auth authentication to use for the request
     * @returns route info for the given route(s)
     */
    export function getPatternPaths(patternIds: string[], auth?: string): Promise<PatternPathsResponse[]>
    
    /**
     * Get the active vehicles on given route(s)
     * @param {string[]} patternIds 
     * @param {*} auth authentication to use for the request
     * @returns list of active vehicles on the given route(s)
     */
    export function getVehicles(patternIds: string[], auth?: string): Promise<VehicleResponse[]>
    
    
    /**
     * Get the next departure times for a stop
     * @param {string} routeId route id to get departure times for
     * @param {string[]} directionIds direction id to get departure times for
     * @param {string} stopCode stop id to get departure times for
     * @param {string} auth authentication to use for the request
     * @returns list of departure times for the given stop
     */
    export function getNextDepartureTimes(routeId: string, directionIds: string[], stopCode: string, auth?: string): Promise<NextDepartureTimesResponse>

    /**
     * Get matching bus stops for search query
     * @param {string} query search query
     * @param {string} auth authentication to use for the request
     * @returns list of bus stops that match the search query
     */
    export async function findBusStops(query: string, auth: string): Promise<FoundStop[]>

    /**
     * Get matching locations for search query
     * @param {string} query search query
     * @param {string} gAuth google api authentication to use for the request
     * @returns list of locations that match the search query
     */
    export async function findLocations(query: string, gAuth: string): Promise<FoundLocation[]>

    /**
     * Get matching bus stops for search query
     * @param {Endpoint} origin search query
     * @param {Endpoint} destination search query
     * @param {Date?} arriveTime time to arrive at destination
     * @param {Date?} departTime time to depart from origin
     * @returns trip plan for the given origin and destination
     */
    export async function getTripPlan(
                                        origin: Endpoint, 
                                        destination: Endpoint, 
                                        arriveTime?: Date, 
                                        departTime?: Date, 
                                        auth: string
                                    ): Promise<TripPlan>

}
