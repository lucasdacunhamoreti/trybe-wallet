// Coloque aqui suas actions
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_API = 'REQUEST_API';
export const ADD_EXPENSE = 'ADD_EXPENSE';

const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

const loginAction = (payload) => ({
  type: LOGIN_ACTION,
  payload,
});

function getCurrencies(data) {
  return { type: GET_CURRENCIES, payload: data };
}

function requestApi() {
  return { type: REQUEST_API };
}

export function fetchApi() {
  return async (dispatch) => {
    dispatch(requestApi());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(getCurrencies(data)));
  };
}

export const setExpense = (walletState) => async (dispatch) => {
  const currencyApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesData = await currencyApi.json();
  const payload = { ...walletState, exchangeRates: { ...currenciesData } };
  dispatch(addExpense(payload));
};

export const actionCreators = {
  loginAction,
};

export const LOGIN = 'LOGIN';

export function actionLogin(email, senha) {
  return ({
    type: LOGIN,
    payload: { email, senha },
  });
}
