// Type Definitions: API Return Data
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
    instruction: string
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
