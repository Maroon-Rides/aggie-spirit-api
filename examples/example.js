import { MapConnection } from '../src/index.js';

const mapConnection = new MapConnection();

mapConnection.connect().then(() => {
    console.log(mapConnection)
})