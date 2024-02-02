import { getStopEstimates, getAuthentication, findBusStops } from "../src/index.js";

getAuthentication().then(async (auth) => {
    console.log(await findBusStops("zach", auth))
})
