import React from 'react';

export default class List extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let cars = undefined;

        if (this.props.cars)
        cars = this.props.cars.map(function (car) {
            return (<li>{car.id} - {car.start}</li>)
        });

        return(
            <div>
                <h3>{this.props.title}</h3>
                <ul>
                    {cars}
                </ul>
            </div>
        );
    }
}

List.propTypes = {};
