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
            <form className="price-form" onSubmit={this.handleSubmit.bind(this)}>
                <h3>Sett ny pris</h3>
                {
                    this.props.price ? (
                        <p>Gjeldende pris: <em>{this.props.price}</em> kroner pr. minutt</p>
                    ) : undefined
                }
                <input type="number" value={ this.state.newPrice } onChange={this.handleChange.bind(this)} />
                <input type="submit" value="Sett ny pris" className="button" />
            </form>
        );
    }
}

PriceForm.propTypes = {};
