import React from 'react';
import moment from 'moment';
import ListItem from './list-item.jsx';

export default class List extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let cars = undefined;

        if (this.props.cars){
            cars = this.props.cars.map(function (car, index) {
                return(<ListItem key={index} car={car}></ListItem>);
            });
        }

        return(
            <div className="list">
                <h3>{this.props.title}</h3>
                <table>
                    {cars}
                </table>
            </div>
        );
    }
}

List.propTypes = {};
