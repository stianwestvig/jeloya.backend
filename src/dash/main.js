import React from 'react';
import Logo from './components/logo.jsx';
import List from './components/list.jsx';
import Navigation from './components/navigation.jsx';
import PriceForm from './components/price-form.jsx';
import { httpGet, httpPost } from './modules/json-client.js';
import ParkrActions from './alt/parkr-actions.js';
import ParkrStore from './alt/parkr-store.js';

class App extends React.Component {

    constructor () {
        super();

        this.state = {
            selected: 0,
            newPrice: undefined,
            items: ['Parkerte biler', 'Betalinger', 'Pris']
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
    }

    handleSubmit() {
        ParkrActions.setPrice(this.state.newPrice);
    }

    handleChange(value) {
        this.setState({
            newPrice: value
        });
    }

    handleNavChange(index) {
        this.setState({
            selected: index
        });
    }

    render () {

        let contentParked = (<List title="Parkerte biler" cars={this.state.parked}></List>);
        let contentPayment = (<List title="Betalinger" cars={this.state.finished}></List>);
        let contentPrice = (<PriceForm
            price={this.state.price}
            handleSubmit={this.handleSubmit.bind(this)}
            handleChange={this.handleChange.bind(this)}>
        </PriceForm>);

        return(<div>
            <Logo></Logo>
            <div className="row">
                <div className="small-12 medium-6 small-centered columns">
                    <Navigation items={this.state.items} onNavChange={this.handleNavChange.bind(this)}></Navigation>
                    { (this.state.selected === 0) ? contentParked : undefined }
                    { (this.state.selected === 1) ? contentPayment : undefined }
                    { (this.state.selected === 2) ? contentPrice : undefined }
                </div>
            </div>
        </div>)
    }
}

React.render(<App />, document.querySelector('#content'));


