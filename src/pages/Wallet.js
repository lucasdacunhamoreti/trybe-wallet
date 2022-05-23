import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, setExpense } from '../actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { fetchReturnApi } = this.props;
    fetchReturnApi();
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  submitExpense = (event) => {
    const { addExpense, expenses } = this.props;
    event.preventDefault();
    const id = expenses.length;
    const idPlusExpense = { id, ...this.state };
    addExpense(idPlusExpense);
    this.setState(INITIAL_STATE);
  }

  sumExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length === 0) return 0;
    const total = expenses
      .map(({ value, currency, exchangeRates }) => (
        Number(value) * Number(exchangeRates[currency].ask)
      ))
      .reduce((accumulator, curr) => accumulator + curr);
    return total.toFixed(2);
  };

  render() {
    const { email, currencies, expenses } = this.props;
    console.log(expenses);
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <header>
          <h4 data-testid="email-field">
            Email:
            { email }
          </h4>
          <h4 data-testid="total-field">
            { this.sumExpenses() }
          </h4>
          <h4 data-testid="header-currency-field">Câmbio utilizado: BRL</h4>
        </header>

        <div>
          <label htmlFor="value">
            <input
              id="value"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
              type="number"
              placeholder="Valor da despesa"
            />
          </label>

          <label htmlFor="description">
            <input
              id="description"
              data-testid="description-input"
              type="text"
              placeholder="Descrição da despesa"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currencies">
            Moeda
            <select
              name="currency"
              value={ currency }
              id="currencies"
              onChange={ this.handleChange }
            >
              {currencies.map((coin) => (
                <option key={ coin } value={ coin }>{coin}</option>
              ))}
            </select>
          </label>

          <label htmlFor="payment_method">
            Método de pagamento
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              id="payment_method"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="category">
            Categoria
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              id="category"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <button
            disabled={ !value || !description || !currency || !method || !tag }
            type="submit"
            onClick={ this.submitExpense }
          >
            Adicionar despesa

          </button>
        </div>

        <table>
          <tbody>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>

            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>
                  { expense.exchangeRates[expense.currency].name }
                </td>
                <td>
                  { Number(expense.exchangeRates[expense.currency].ask)
                    .toFixed(2) }
                </td>
                <td>
                  { Number(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2) }
                </td>
                <td>Real</td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchReturnApi: (data) => dispatch(fetchApi(data)),
  addExpense: (state) => dispatch(setExpense(state)),
});

Wallet.propTypes = {
  email: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
