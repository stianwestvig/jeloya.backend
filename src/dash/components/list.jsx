import React from 'react';

export default class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div>
                <h3>{this.props.title}</h3>
                <ul>
                    <li>one</li>
                    <li>two</li>
                </ul>
            </div>
        );
    }
}

List.propTypes = {};
