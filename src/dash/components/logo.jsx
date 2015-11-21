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
                    <div className="small-12 small-centered medium-6 columns text-center">
                        <a href="/">
                            <img
                                alt="parkr"
                                src="parkr-white.svg"
                             />
                            <h1>parkr managr</h1>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

Logo.propTypes = {};
