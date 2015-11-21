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
                return (<li key={index} onClick={that.handleClick.bind(that, index)}>{item}</li>)
            });
        }

        return(
            <ul>
                { items }
            </ul>
        );
    }
}

Navigation.propTypes = {};
