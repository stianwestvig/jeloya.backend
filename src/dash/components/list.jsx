import React from 'react';
import moment from 'moment';
import ListItem from './list-item.jsx';

export default class List extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let cars = undefined;
        let that = this;

        if (this.props.cars){
            cars = this.props.cars.map(function (car, index) {
                return(<ListItem key={index} car={car} price={that.props.price}></ListItem>);
            });
        }

        return(
            <div className="list">
                <h3>{this.props.title}</h3>
                <div className="row">
                    {cars}
                </div>
            </div>
        );
    }
}

List.propTypes = {};
