import React from 'react';
import Logo from './components/logo.jsx';
import List from './components/list.jsx';
import { httpGet, httpPost } from './modules/json-client.js';
import ParkrActions from './alt/parkr-actions.js';
import ParkrStore from './alt/parkr-store.js';

class App extends React.Component {

    constructor () {
        super();

        this.state = {
            newPrice: undefined
        };

        this._onState = this._onState.bind(this);
        ParkrActions.getPrice();
        ParkrActions.getParkings();
    }

    componentDidMount() {
        ParkrStore.listen(this._onState);
    }

    componentWillUnmount() {
        ParkrStore.unlisten(this._onState);
    }

    _onState(newState){
        this.setState ({
            price: newState.price,
            parked: newState.parked,
            finished: newState.finished
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        ParkrActions.setPrice(this.state.newPrice);
    };

    handleChange(event) {
        this.setState({
            newPrice: event.target.value
        });
    };

    render () {
        return(<div>
            <Logo></Logo>
            

            <div className="row">
                <div className="small-12 medium-6 columns">
                    <List title="Parkerte biler" cars={this.state.parked}></List>
                </div>
                <div className="small-12 medium-6 columns">
                    <List title="Betalinger" cars={this.state.finished}></List>
                </div>
            </div>
            <div className="row">
                <div className="small-12 medium-6 columns">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        {
                            this.state.price ? (
                                <p>Gjeldende pris: <em>{this.state.price}</em></p>
                            ) : undefined
                        }
                        <input type="number" value={ this.state.newPrice } onChange={this.handleChange.bind(this)} />
                        <input type="submit" value="Oppdater pris" className="button" />
                    </form>
                </div>
            </div>

        </div>)
    }
}

React.render(<App />, document.querySelector('#content'));


