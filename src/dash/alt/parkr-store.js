import alt from './alt.js';
import ParkrActions from './parkr-actions.js';
import { httpGet } from '../modules/json-client.js';

let baseUrl = 'https://park0r.herokuapp.com/api/';

export class ParkrStore {
    constructor() {
        this.price = undefined;
        this.parkings = [];

        this.bindListeners({
            handleGetPrice: ParkrActions.GET_PRICE,
            handleSetPrice: ParkrActions.SET_PRICE,
            handleGetParkings: ParkrActions.GET_PARKINGS
        });
    }

    handleGetPrice(payload) {
        this.price = payload.price;
    }

    handleSetPrice(payload) {
        this.price = payload.price;
    }

    handleGetParkings(payload) {

        let url = baseUrl + 'username';

        payload.map(function (car) {
            httpGet(url, {id: car.id})
                .catch(err => console.error('#handleGetParkings', err))
                .then(res => car.user = res.body);
            return car;
        });

        let finished = payload.filter(isFinishedParking);
        let parked = payload.filter(isNotFinishedParking);

        this.finished = finished;
        this.parked = parked;
    }
}

export default alt.createStore(ParkrStore, 'ParkrStore');

function isFinishedParking(parking) {
    return parking.end
}

function isNotFinishedParking(parking) {
    return !parking.end
}