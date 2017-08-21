import Auth from '../auth';

export function fetchActivePayments() {
  //Fetch all the active payments for a user
  return function (dispatch) {
    dispatch({type: "FETCH_ACTIVE_PAYMENTS", status: "pending", error: ""});
    Auth.getActivePayments()
    .then(res => {
      dispatch({type: "FETCH_ACTIVE_PAYMENTS", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "FETCH_ACTIVE_PAYMENTS", status: "error", error: err});
    });    
  };
}

export function fetchLatestPayments(numDaysBefore=0, numDaysAfter=7) {
  // Currently unused!!!
  // Fetch the latest payments for a range of date
  return function (dispatch) {
    dispatch({type: "FETCH_LATEST_PAYMENTS", status: "pending", error: ""});
    Auth.getLatestPayments(numDaysBefore, numDaysAfter)
    .then(res => {
      dispatch({type: "FETCH_LATEST_PAYMENTS", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "FETCH_LATEST_PAYMENTS", status: "error", error: err});
    });    
  };
}

export function fetchContractPayments (contractId) {
  return function (dispatch) {
    dispatch({type: "FETCH_CONTRACT_PAYMENTS", status: "pending", error: ""});
    Auth.getContractPayments(contractId)
    .then(res => {
      dispatch({type: "FETCH_CONTRACT_PAYMENTS", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "FETCH_CONTRACT_PAYMENTS", status: "error", error: err});
    });
  };
}

export function addPayment (payment) {
  return function (dispatch) {
    dispatch({type: "ADD_PAYMENT", status: "pending", error: ""});
    Auth.addPayment(payment)
    .then(res => {
      dispatch({type: "ADD_PAYMENT", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "ADD_PAYMENT", status: "error", error: err});
    });
  };
}