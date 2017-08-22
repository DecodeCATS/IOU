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

export function addContract (contract) {
  return function (dispatch) {
    dispatch({type: "ADD_CONTRACT", status: "pending", error: ""});
    Auth.addContract(contract)
    .then(res => {
      dispatch({type: "ADD_CONTRACT", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "ADD_CONTRACT", status: "error", error: err});
    });
  };
}