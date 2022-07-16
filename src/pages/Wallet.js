import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, setExpense, removeExpense } from '../actions';
import './Wallet.css';
import logo from '../images/logo.svg';

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
    const { email, currencies, expenses, deleteExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <header id="container-header">
          <div>
            <img src={ logo } alt="logo" />
          </div>
          <div id="container-info-header">
            <h5 data-testid="email-field">
              Email:
              { email }
            </h5>
            <h5 id="expense-total" data-testid="total-field">
              Despesa Total: R$
              { Number(this.sumExpenses()).toFixed(2) }
            </h5>
            <h5 data-testid="header-currency-field">BRL</h5>
          </div>
        </header>

        <div id="container-add-expense">
          <label htmlFor="value">
            <input
              id="value"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
              type="number"
              placeholder="Valor da despesa"
              className="form-control"
              aria-label="Valor da despesa"
              aria-describedby="basic-addon1"
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
              className="form-control"
              aria-label="Descrição da despesa"
              aria-describedby="basic-addon1"
            />
          </label>

          <label htmlFor="currencies">
            Moeda
            <select
              name="currency"
              value={ currency }
              id="currencies"
              onChange={ this.handleChange }
              className="form-select"
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
              className="form-select"
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
              className="form-select"
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
            className="btn btn-info"
          >
            Adicionar despesa

          </button>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr id="descriptions-table">
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>
                  R$
                  { Number(expense.value).toFixed(2) }
                </td>
                <td>
                  { expense.exchangeRates[expense.currency].name }
                </td>
                <td>
                  R$
                  { Number(expense.exchangeRates[expense.currency].ask)
                    .toFixed(2) }
                </td>
                <td>
                  R$
                  { Number(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteExpense(expense) }
                    className="btn btn-danger"
                  >
                    Excluir
                  </button>
                </td>
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
  deleteExpense: (state) => dispatch(removeExpense(state)),
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
