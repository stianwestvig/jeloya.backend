import React from 'react';

export default class Navigation extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick(index) {
        this.props.onNavChange(index);
    }

    render() {

        let items = undefined;
        let that = this;

        if(this.props.items){
            items = this.props.items.map(function (item, index) {
                return (<li className="button" key={index} onClick={that.handleClick.bind(that, index)}>{item}</li>)
            });
        }

        return(
            <ul className="navigation">
                { items }
            </ul>
        );
    }
}

Navigation.propTypes = {};
