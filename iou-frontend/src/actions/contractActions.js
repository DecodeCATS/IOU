import Auth from '../auth';

export function fetchContracts () {
  return function (dispatch) {
    dispatch({type: "FETCH_ALL_CONTRACTS", status: "pending", error: ""});
    Auth.getContracts()
    .then(res => {
      dispatch({type: "FETCH_ALL_CONTRACTS", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "FETCH_ALL_CONTRACTS", status: "error", error: err});
    });
  };
}

