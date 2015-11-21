import alt from './alt.js';
import ParkrActions from './parkr-actions.js';
import { httpGet } from '../modules/json-client.js';

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
            httpGet(url, car.id)
                .catch(err => console.error('#handleGetParkings', err))
                .then(res => car.user = res.body);
        });

        let finished = payload.filter(isFinishedParking);
        let parked = payload.filter(isNotFinishedParking);

        this.finished = finished;
        this.parked = parked;
    }

    getUserName(id) {
        let url = baseUrl + 'username';

        httpGet(url, id)
            .catch(err => console.error('#getUserName', err))
            .then(res => this.dispatch(res.body));
    }
}

export default alt.createStore(ParkrStore, 'ParkrStore');

function isFinishedParking(parking) {
    return parking.end
}

function isNotFinishedParking(parking) {
    return !parking.end
}