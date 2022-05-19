import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      paymentMethod: 'Dinheiro',
      category: 'Alimentação',
    };
  }

  componentDidMount() {
    const { setCurrencies } = this.props;
    setCurrencies();
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { email, currencies } = this.props;
    const { value, description, currency, paymentMethod, category } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            { email }
          </p>
          <p data-testid="total-field">
            0
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>

        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              name="value"
              value={ value }
              type="text"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              name="description"
              type="text"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
              id="description"
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              onChange={ this.handleChange }
              value={ currency }
            >
              { currencies.map((countryCurrency) => (
                <option
                  key={ countryCurrency }
                  value={ countryCurrency }
                >
                  { countryCurrency }
                </option>))}
            </select>
          </label>

          <label htmlFor="paymentMethod">
            Método de Pagamento:
            <select
              id="paymentMethod"
              data-testid="method-input"
              onChange={ this.handleChange }
              name="paymentMethod"
              value={ paymentMethod }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="category">
            Categoria:
            <select
              id="category"
              data-testid="tag-input"
              name="category"
              value={ category }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: () => {
    dispatch(getCurrencies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  setCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};
