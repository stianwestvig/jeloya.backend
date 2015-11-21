import React from 'react';

export default class Hero extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <h2 className="hero">parkr</h2>
        );
    }
}

Hero.propTypes = {};
