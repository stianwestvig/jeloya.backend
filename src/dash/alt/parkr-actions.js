import alt from './alt.js';
import { httpGet, httpPost } from '../modules/json-client.js';

let baseUrl = 'http://10.10.2.35:3000/api/';

class ParkrActions {

    getPrice() {
        let url = baseUrl + 'price';

        httpGet(url)
            .catch(err => console.error('#getPrice', err))
            .then(res => this.dispatch(res.body));
    }

    setPrice(newPrice) {
        let url = baseUrl + 'price';

        httpPost(url, {price: newPrice})
            .catch(err => console.error('#setPrice', err))
            .then(res => this.dispatch(res.body));
    }

    getParkings() {
        let url = baseUrl + 'parkings';

        httpGet(url)
            .catch(err => console.error('#getParkings', err))
            .then(res => this.dispatch(res.body));
    }
}
export default alt.createActions(ParkrActions);