import React from 'react';

export default class Logo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div className="logo">
                <div className="row">
                    <div className="small-12 small-centered medium-6 columns">
                        <a href="/">
                            <img
                                alt="parkr"
                                src="parkr.png"
                             />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

Logo.propTypes = {};
