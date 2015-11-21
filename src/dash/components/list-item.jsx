import React from 'react';

export default class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let formatString = 'MMM Do, h:mm:ss a';
        let start = this.props.car.start.format(formatString);
        let end = this.props.end ? this.props.end.format(formatString) : undefined;


        return(
            <li>
                { this.props.car.id }
                { start }
                { end }
            </li>
        );
    }
}

ListItem.propTypes = {};
