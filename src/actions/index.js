// Coloque aqui suas actions

export const addEmail = (name) => ({ type: 'ADD_EMAIL', payload: name });

const addCurrencies = (currencies) => ({
  type: 'ADD_CURRENCIES',
  payload: currencies,
});

export const getCurrencies = () => async (dispatch) => {
  const returnApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesData = await returnApi.json();
  const filteredCurrencies = Object.keys(currenciesData)
    .filter((currency) => currency !== 'USDT');
  dispatch(addCurrencies(filteredCurrencies));
};
