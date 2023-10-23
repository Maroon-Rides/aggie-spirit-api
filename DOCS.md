# AggieSpirit API Documentation

## `getRoutesByGroup(routeGroup)`

`routeGroup`: 
- `RouteGroup.ALL`
- `RouteGroup.ON_CAMPUS`
- `RouteGroup.OFF_CAMPUS`
- `RouteGroup.GAMEDAY`

*You are able to put multiple `RouteGroup` in an ... to access multiple at a time*

`getRoutesByGroup(RouteGroup.ALL)` Returns:
```js
{
  "OnCampus": [
    {
      key: "39df824f-5a0b-4b00-8cbf-6a12627b1351",
      name: "Bonfire",
      shortName: "01",
      description: "",
      routeInfo: [...],
      routePatterns: [...]
    },
    {
      key: "418d0717-262d-4fc8-885a-344d5afc292a",
      name: "Nights & Weekends",
      shortName: "01-04",
      description: "",
      routeInfo: [...],
      routePatterns: [...]
    },
    {
      key: "00a2aebb-d91c-42d7-8592-4bf17dbb5956",
      name: "Yell Practice",
      shortName: "03",
      description: "",
      routeInfo: [...],
      routePatterns: [...]
    } ...
  ],
  "OffCampus": [
    {
      key: "56f5b4fb-a637-44d3-8c91-617aae0b8a08",
      name: "Reveille",
      shortName: "12",
      description: "",
      routeInfo: [...],
      routePatterns: [...]
    },
    {
      key: "ffdbc389-7678-4a66-873d-4b0ef954b81d",
      name: "Old Army",
      shortName: "15",
      description: "",
      routeInfo: [...],
      routePatterns: [...]
    },
    {
      key: "857fe6f6-8106-4147-9a3a-553786439f86",
      name: "Excel",
      shortName: "22",
      description: "",
      routeInfo: [...],
      routePatterns: [...]
    },
    {
      key: "75011f50-f500-4436-9e0c-1db1cd001735",
      name: "Rudder",
      shortName: "26",
      description: "",
      routeInfo: [...],
      routePatterns: [...]
    } ...
  ],
  "Gameday": [ 
    "***only returns similar data to above when current day is Gameday*** "
  ]
}
```

## `getRouteByKey(routeKey)`

`routeKey`: key of the route (usually from `getRoutesByGroup`)

`getRouteByKey("ffdbc389-7678-4a66-873d-4b0ef954b81d")` Returns:

```json
{
    "routeKey": "ffdbc389-7678-4a66-873d-4b0ef954b81d",
    "color": "BE0404",
    "patternPaths": [
        {
            "patternKey": "5457f12e-69f8-4aa2-8bf1-e360d10c8f9b",
            "patternPoints": [
                {
                    "key": "4f8bfae4-c0e8-42f9-980e-e9830cb615d7",
                    "name": "MSC",
                    "description": "",
                    "rank": 0,
                    "longitude": -96.3415752108455,
                    "latitude": 30.6134148689503,
                    "isStop": true,
                    "isTimePoint": true,
                    "stop": {
                        "key": "4e684d34-c2f7-4c90-bb74-e7fb20bb9ee1",
                        "name": "MSC",
                        "stopCode": "1500",
                        "isTemporary": false,
                        "attributes": []
                    },
                    "routeHeaderRank": 0,
                    "distanceToPreviousPoint": 0
                },
                {
                    "key": "a06aeb6e-d082-4a73-b208-e22ba789dbf8",
                    "name": "Way Point",
                    "description": "",
                    "rank": 1,
                    "longitude": -96.3413647616723,
                    "latitude": 30.6136130162247,
                    "isStop": false,
                    "isTimePoint": false,
                    "stop": null,
                    "routeHeaderRank": -1,
                    "distanceToPreviousPoint": 29.830055872689
                },
                {
                    "key": "5248bd25-70db-4a39-ae3e-b7169e191ef5",
                    "name": "Way Point",
                    "description": "",
                    "rank": 2,
                    "longitude": -96.3431967105386,
                    "latitude": 30.615721232636,
                    "isStop": false,
                    "isTimePoint": false,
                    "stop": null,
                    "routeHeaderRank": -1,
                    "distanceToPreviousPoint": 292.527150511298
                } ...
            ]
        },
        {
            "patternKey": "2fd69720-4336-4557-9f4f-7263b15cd753",
            "patternPoints": [
                {
                    "key": "1697c227-0229-40ac-8fed-1b926becdbb0",
                    "name": "Villa Maria @ Green Street",
                    "description": "",
                    "rank": 0,
                    "longitude": -96.361779,
                    "latitude": 30.638024,
                    "isStop": true,
                    "isTimePoint": true,
                    "stop": {
                        "key": "7c21a762-644a-40c3-99c3-66cec943f4a7",
                        "name": "Villa Maria @ Green Street",
                        "stopCode": "1518",
                        "isTemporary": false,
                        "attributes": []
                    },
                    "routeHeaderRank": 0,
                    "distanceToPreviousPoint": 0
                },
                {
                    "key": "cbce4b23-3960-4e38-ab5b-e9573082966e",
                    "name": "Way Point",
                    "description": "",
                    "rank": 1,
                    "longitude": -96.3613606310702,
                    "latitude": 30.6383094572013,
                    "isStop": false,
                    "isTimePoint": false,
                    "stop": null,
                    "routeHeaderRank": -1,
                    "distanceToPreviousPoint": 51.04994312944
                },
                {
                    "key": "1fc1ab12-234b-4058-add7-5a0804b7dd44",
                    "name": "Way Point",
                    "description": "",
                    "rank": 2,
                    "longitude": -96.3581902598256,
                    "latitude": 30.6396653139392,
                    "isStop": false,
                    "isTimePoint": false,
                    "stop": null,
                    "routeHeaderRank": -1,
                    "distanceToPreviousPoint": 338.489330185806
                },
                {
                    "key": "c5fc8b99-1871-4f31-8ce1-180587737732",
                    "name": "College Ave @ Sulphur Springs",
                    "description": "",
                    "rank": 3,
                    "longitude": -96.356901,
                    "latitude": 30.637899,
                    "isStop": true,
                    "isTimePoint": false,
                    "stop": {
                        "key": "a2af8f0e-37ae-4d57-8ff5-37b8d2e46551",
                        "name": "College Ave @ Sulphur Springs",
                        "stopCode": "1520",
                        "isTemporary": false,
                        "attributes": []
                    },
                    "routeHeaderRank": -1,
                    "distanceToPreviousPoint": 231.768653313121
                } ...
            ]
        }
    ]
}
```

## `getRouteByName(routeName)`

`routeName`: Name of the route to access

`getRouteByName("47")` Returns: 
```json
{
    "key": "bb424c87-7268-4aaf-b06d-c7b2cad3606a",
    "name": "RELLIS",
    "shortName": "47",
    "description": "",
    "routeInfo": {
        "routeKey": "bb424c87-7268-4aaf-b06d-c7b2cad3606a",
        "color": "2C4A3E",
        "patternPaths": [
            {
                "patternKey": "32017ef6-6b58-469a-a89d-0f3bbd0c5ea0",
                "patternPoints": [
                    {
                        "key": "a4d3e133-639b-4a0b-aa60-03793be70d2a",
                        "name": "MSC",
                        "description": "",
                        "rank": 0,
                        "longitude": -96.3427096824385,
                        "latitude": 30.6126470056283,
                        "isStop": true,
                        "isTimePoint": true,
                        "stop": {
                            "key": "646c19a4-e7fd-4e10-b96f-7205a0ff9aa4",
                            "name": "MSC",
                            "stopCode": "4700",
                            "isTemporary": false,
                            "attributes": []
                        },
                        "routeHeaderRank": 0,
                        "distanceToPreviousPoint": 0
                    },
                    {
                        "key": "5fee03d0-0db8-4fdf-8ef1-75fbabd3b543",
                        "name": "Way Point",
                        "description": "",
                        "rank": 1,
                        "longitude": -96.3413942659732,
                        "latitude": 30.6135996051788,
                        "isStop": false,
                        "isTimePoint": false,
                        "stop": null,
                        "routeHeaderRank": -1,
                        "distanceToPreviousPoint": 164.40700153492
                    },
                    {
                        "key": "8fbbbd4e-b824-4ae7-8547-6e2838630968",
                        "name": "Way Point",
                        "description": "",
                        "rank": 2,
                        "longitude": -96.3433643486121,
                        "latitude": 30.6159451971022,
                        "isStop": false,
                        "isTimePoint": false,
                        "stop": null,
                        "routeHeaderRank": -1,
                        "distanceToPreviousPoint": 321.604285242341
                    } ...
                ]
            },
            {
                "patternKey": "bd2939d3-9cff-422a-ac26-c46f3dc9fb5c",
                "patternPoints": [
                    {
                        "key": "eedcb52e-69c1-4504-950a-dfe5e85f16f5",
                        "name": "Blinn - RELLIS",
                        "description": "",
                        "rank": 0,
                        "longitude": -96.4673597887532,
                        "latitude": 30.641864324919,
                        "isStop": true,
                        "isTimePoint": true,
                        "stop": {
                            "key": "ac6a9e5c-5ecf-4cde-8a6a-9e77119c2737",
                            "name": "Blinn - RELLIS",
                            "stopCode": "4724",
                            "isTemporary": false,
                            "attributes": []
                        },
                        "routeHeaderRank": 0,
                        "distanceToPreviousPoint": 0
                    },
                    {
                        "key": "31abbff1-66c2-4911-8b34-58b038c68657",
                        "name": "Way Point",
                        "description": "",
                        "rank": 1,
                        "longitude": -96.4672770480679,
                        "latitude": 30.6417051340166,
                        "isStop": false,
                        "isTimePoint": false,
                        "stop": null,
                        "routeHeaderRank": -1,
                        "distanceToPreviousPoint": 19.377221896561
                    },
                    {
                        "key": "c49d1792-6bdb-4727-bbf9-44bedc9bdde7",
                        "name": "Way Point",
                        "description": "",
                        "rank": 2,
                        "longitude": -96.4654115715868,
                        "latitude": 30.6417212272716,
                        "isStop": false,
                        "isTimePoint": false,
                        "stop": null,
                        "routeHeaderRank": -1,
                        "distanceToPreviousPoint": 178.356809017028
                    } ...
                ]
            }
        ]
    },
    "routePatterns": [
        {
            "key": "32017ef6-6b58-469a-a89d-0f3bbd0c5ea0",
            "name": "47 Outbound",
            "shortName": "47O",
            "description": "Outbound to Blinn - RELLIS",
            "direction": {
                "key": "587a1d41-60c3-4a6d-b848-7f3f1a137ae0",
                "name": "Outbound"
            },
            "destination": "Blinn - RELLIS",
            "lineDisplayInfo": {
                "color": "2C4A3E",
                "type": 1,
                "symbol": 0,
                "size": 5
            },
            "timePointDisplayInfo": {
                "color": "FFFF00",
                "type": 0,
                "symbol": 1,
                "size": 8
            },
            "busStopDisplayInfo": {
                "color": "800080",
                "type": 0,
                "symbol": 1,
                "size": 8
            },
            "isDisplay": true
        },
        {
            "key": "bd2939d3-9cff-422a-ac26-c46f3dc9fb5c",
            "name": "47 Inbound",
            "shortName": "47I",
            "description": "Inbound to MSC",
            "direction": {
                "key": "f65589af-fb88-4f71-979f-c5378fe90101",
                "name": "Inbound"
            },
            "destination": "MSC",
            "lineDisplayInfo": {
                "color": "2C4A3E",
                "type": 1,
                "symbol": 0,
                "size": 5
            },
            "timePointDisplayInfo": {
                "color": "FFFF00",
                "type": 0,
                "symbol": 1,
                "size": 8
            },
            "busStopDisplayInfo": {
                "color": "800080",
                "type": 0,
                "symbol": 1,
                "size": 8
            },
            "isDisplay": true
        }
    ]
}
```


## `getRouteBuses(routeName)`

`routeName`: Name of the route to access

`getRouteBuses("47")` Returns: 
```json
[
    {
        "key": "3844a6cb-db43-4fa2-a59e-3ddd3452f7a4",
        "name": "B2001",
        "vehicleType": "Gillig",
        "location": {
            "latitude": 30.62043083333333,
            "longitude": -96.34323933333332,
            "speed": 0,
            "heading": 223.39999389648438,
            "lastGpsDate": "2023-10-23T09:01:12-05:00"
        },
        "passengerLoad": 21,
        "passengerCapacity": 100,
        "routeKey": "bb424c87-7268-4aaf-b06d-c7b2cad3606a",
        "patternKey": null,
        "tripKey": null,
        "nextStopDeparture": {
            "stopKey": null,
            "stopCode": "0032",
            "tripPointKey": null,
            "patternPointKey": null,
            "scheduledDeparture": null,
            "estimatedDeparture": null,
            "hasDeparted": false,
            "stopName": "Vet School  - Outbound"
        },
        "attributes": [],
        "amenities": [
            {
                "key": "0a028511-3362-45dd-97cc-e43ec713c0a3",
                "name": "Air Conditioning",
                "description": "The vehicle has air conditioning.",
                "iconName": "snowflake",
                "iconCode": "62172",
                "iconType": "FontAwesome57_Solid"
            },
            {
                "key": "66eafc1f-74b4-45cb-88f4-00ffe36c4619",
                "name": "Wheelchair Lift",
                "description": "The vehicle is accessible for a wheelchair or passengers with reduced mobility.",
                "iconName": "wheelchair",
                "iconCode": "61843",
                "iconType": "FontAwesome57_Solid"
            }
        ],
        "routeName": "RELLIS",
        "routeShortName": "47",
        "patternName": "47 Outbound",
        "patternDestination": "Blinn - RELLIS",
        "patternColor": "2C4A3E",
        "directionName": "Outbound",
        "isTripper": false,
        "workItemKey": null,
        "routeStatus": null,
        "opStatus": {
            "status": "Unknown",
            "color": "rgba(80, 0, 0, 1);"
        }
    },
    {
        "key": "bc1cfaef-41a3-4a73-87de-f50f7419101e",
        "name": "B2116",
        "vehicleType": "Gillig",
        "location": {
            "latitude": 30.60335183333333,
            "longitude": -96.37812183333332,
            "speed": 0,
            "heading": 58.22999954223633,
            "lastGpsDate": "2023-10-23T09:01:14-05:00"
        },
        "passengerLoad": 0,
        "passengerCapacity": 100,
        "routeKey": "bb424c87-7268-4aaf-b06d-c7b2cad3606a",
        "patternKey": null,
        "tripKey": null,
        "nextStopDeparture": {
            "stopKey": null,
            "stopCode": "4730",
            "tripPointKey": null,
            "patternPointKey": null,
            "scheduledDeparture": null,
            "estimatedDeparture": null,
            "hasDeparted": false,
            "stopName": "Atlas Pear Dr - Inbound"
        },
        "attributes": [],
        "amenities": [
            {
                "key": "0a028511-3362-45dd-97cc-e43ec713c0a3",
                "name": "Air Conditioning",
                "description": "The vehicle has air conditioning.",
                "iconName": "snowflake",
                "iconCode": "62172",
                "iconType": "FontAwesome57_Solid"
            },
            {
                "key": "66eafc1f-74b4-45cb-88f4-00ffe36c4619",
                "name": "Wheelchair Lift",
                "description": "The vehicle is accessible for a wheelchair or passengers with reduced mobility.",
                "iconName": "wheelchair",
                "iconCode": "61843",
                "iconType": "FontAwesome57_Solid"
            }
        ],
        "routeName": "RELLIS",
        "routeShortName": "47",
        "patternName": "47 Inbound",
        "patternDestination": "MSC",
        "patternColor": "2C4A3E",
        "directionName": "Inbound",
        "isTripper": false,
        "workItemKey": null,
        "routeStatus": null,
        "opStatus": {
            "status": "Unknown",
            "color": "rgba(80, 0, 0, 1);"
        }
    }
]
```


