import { getRouteInfo, getRoutes, RouteGroup } from '../src/index.js';

getRoutes(RouteGroup.ALL).then((routes) => {

    getRouteInfo(routes.map((r) => r.key)).then((routeInfo) => {
        console.log(routeInfo)
    })
    
})
