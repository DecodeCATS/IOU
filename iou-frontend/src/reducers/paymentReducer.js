

const defaultState = {
  status: "",
  statusType: "",
  error: "",
  dataUpdated: null,
  data: []
};

//The reducer affecting the payments
const paymentReducer = (state=defaultState, action) => {
  //The reducer cannot return the state directly after a transformation, or else it means that we have changed the original state (immutability)
  switch (action.type) {
    case "FETCH_ACTIVE_PAYMENTS": {
      //Basic case to set the payments after a server fetch
      //Assume action.value is the array of payments
      //return action.value;
      if (action.status === "success") {
        state = {...state, data: action.value.payments, dataUpdated: Date()};
      }
      state = {...state, status: action.status, statusType: action.type, error: action.error};
      break;
    }
    case "FETCH_CONTRACT_PAYMENTS": {
      //Basic case to set the payments after a server fetch
      //Assume action.value is the array of payments
      //return action.value;
      if (action.status === "success") {
        state = {...state, data: action.value.payments, dataUpdated: Date()};
      }
      state = {...state, status: action.status, statusType: action.type, error: action.error};
      break;
    }
    default:
      break;
  }
  return state;
};

export default paymentReducer;