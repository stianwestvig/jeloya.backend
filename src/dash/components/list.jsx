import React from 'react';
import moment from 'moment';
import ListItem from './list-item.jsx';

export default class List extends React.Component {

    constructor(props) {
        super(props);

        /*this.state = {
            cars: [
                {id: '8478435685', start: moment().subtract(5, 'hours')},
                {id: '829uf87g8', start: moment().subtract(4, 'hours')},
                {id: 'uh8f7gds86f', start: moment().subtract(3, 'hours')},
                {id: 'sdfuh8sf7', start: moment().subtract(1, 'hours')}
            ]
        }*/
    }

    render() {
        let cars = undefined;

        if (this.props.cars){
            cars = this.props.cars.map(function (car, index) {
                return(<ListItem key={index} car={car}></ListItem>);
            });
        }
        /*else {
            cars = this.state.cars.map(function (car, index) {
                return(<ListItem key={index} car={car}></ListItem>);
            });
        }*/

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
