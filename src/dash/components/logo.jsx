import React from 'react';

export default class Logo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <a className="logo" href="/">
                <img
                    alt="parkr"
                    src="parkr.png"
                    width="300" />
            </a>
        );
    }
}

Logo.propTypes = {};
