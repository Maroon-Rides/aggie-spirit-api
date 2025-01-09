import { getStopEstimates, findBusStops, getBaseData } from "../dist/index.js";

// you must provide your own authentication function and valid header to authenticate with the API
const auth = {
    "Cookie": "your cookie here"
}

console.log(await getBaseData(auth))
