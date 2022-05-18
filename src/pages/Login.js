import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit = (event) => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    event.preventDefault();
    dispatch(addEmail(email));
    history.push('/carteira');
  }

  handleValidateEmail = (email) => {
    const emailRegrex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegrex.test(email);
  }

  handleValidatePassword = (password) => {
    const MIN_LENGTH_PASSWORD = 6;
    return password.length >= MIN_LENGTH_PASSWORD;
  }

  render() {
    const { email, password } = this.state;
    return (
      <section>
        <form>
          <div>
            <label htmlFor="email">
              Email
              <input
                onChange={ this.handleChange }
                name="email"
                data-testid="email-input"
                type="email"
                value={ email }
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Senha
              <input
                onChange={ this.handleChange }
                name="password"
                data-testid="password-input"
                value={ password }
                type="password"
              />
            </label>
          </div>
          <button
            type="submit"
            onClick={ this.handleSubmit }
            disabled={ !this.handleValidateEmail(email)
              || !this.handleValidatePassword(password) }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
