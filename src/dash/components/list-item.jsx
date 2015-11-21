import React from 'react';
import moment from 'moment';

export default class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let formatString = 'D. MMM  -  hh:mm';
        let start = this.props.car.start.format(formatString);
        let end = this.props.end ? this.props.end.format(formatString) : undefined;


        return(

            <div>
                <tr>
                    <td><em>Bruker:</em> { this.props.car.user ? this.props.car.user : this.props.car.id }</td>
                    <td><em>Inn:</em> { start }</td>
                </tr>
                <tr>
                    <td><em>Betalt:</em> { this.props.car.price ? this.props.car.price : '200,-' }</td>
                    <td><em>Ut:</em> { moment().format(formatString) }</td>
                </tr>
            </div>

        );
    }
}

ListItem.propTypes = {};
