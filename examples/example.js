import { getActiveRoutes, getAuthentication, getBaseData, getNearbyRoutes, getPatternPaths } from "../src/index.js";

getNearbyRoutes()
    .then((res) => {
        console.log(res)
    })
