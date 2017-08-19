import Auth from '../auth';

export function fetchCurrencies () {
  return function (dispatch) {
    dispatch({type: "FETCH_CURRENCIES", status: "pending", error: ""});
    Auth.getCurrencies()
    .then(res => {
      dispatch({type: "FETCH_CURRENCIES", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "FETCH_CURRENCIES", status: "error", error: err});
    });
  };
}