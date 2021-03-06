import React from 'react';
import moment from 'moment';

export default class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    calculatePrice(start, end, price) {

        if(!start || !end ||!price) {
            return;
        }

        var parkTimeInSeconds = moment.duration(end.diff(start)) / 1000;
        return Math.round(parkTimeInSeconds * price);
    };

    render() {

        let formatString = 'D. MMM  -  hh:mm';
        let startMoment = moment(this.props.car.start);
        let endMoment = moment(this.props.car.end);
        let start = startMoment.format(formatString);
        let end = endMoment.format(formatString);
        let calculatedPrice = this.calculatePrice(startMoment, endMoment, this.props.price);

        return(
            <div className="small-12 columns entry">

            <div className="row">
                <div className="small-6 columns"><em>Bruker:</em> { this.props.car.user.name ? this.props.car.user.name : this.props.car.user.id }</div>
                <div className="small-6 columns"><em>Inn:</em> { start }</div>
            </div>
            { this.props.car.end
                ? (<div className="row">
                    <div className="small-6 columns"><em>Betalt:</em> { calculatedPrice },-</div>
                    <div className="small-6 columns"><em>Ut:</em> { end }</div>
                </div>)
                : undefined }
            </div>
        );
    }
}

ListItem.propTypes = {};