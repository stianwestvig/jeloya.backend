import React from 'react';

export default class PriceForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit();
    }

    handleChange(event) {
        this.props.handleChange(event.target.value);
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                {
                    this.props.price ? (
                        <p>Gjeldende pris: <em>{this.props.price}</em></p>
                    ) : undefined
                }
                <input type="number" value={ this.state.newPrice } onChange={this.handleChange.bind(this)} />
                <input type="submit" value="Oppdater pris" className="button" />
            </form>
        );
    }
}

PriceForm.propTypes = {};
