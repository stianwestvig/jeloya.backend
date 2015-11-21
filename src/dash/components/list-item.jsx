import React from 'react';
import moment from 'moment';

export default class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let formatString = 'D. MMM  -  hh:mm';
        let startMoment = moment(this.props.car.start);
        let endMoment = moment(this.props.car.end);
        let start = startMoment.format(formatString);
        let end = endMoment.format(formatString);

        return(
            <div className="small-12 columns entry">

            <div className="row">
                <div className="small-6 columns"><em>Bruker:</em> { this.props.car.user.name ? this.props.car.user.name : this.props.car.user.id }</div>
                <div className="small-6 columns"><em>Inn:</em> { start }</div>
            </div>
            { this.props.car.end
                ? (<div className="row">
                    <div className="small-6 columns"><em>Betalt:</em> { this.props.car.price ? this.props.car.price : '200,-' }</div>
                    <div className="small-6 columns"><em>Ut:</em> { end }</div>
                </div>)
                : undefined }
            </div>
        );
    }
}

ListItem.propTypes = {};
