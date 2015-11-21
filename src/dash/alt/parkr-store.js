import alt from './alt.js';
import ParkrActions from './parkr-actions.js';

export class ParkrStore {
    constructor() {
        this.price = undefined;
        this.parked = [];
        this.finished = [];

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