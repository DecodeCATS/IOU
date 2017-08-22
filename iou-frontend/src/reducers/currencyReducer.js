//Reducer acting on the currencies

const defaultState = {
  status: "",
  statusType: "",
  error: "",
  dataUpdated: null,
  data: []
};
//The reducer affecting the currency
const currencyReducer = (state=defaultState, action) => {
  switch (action.type) {
    case "FETCH_CURRENCIES": {
      //Basic case to set the notifications after a server fetch
      //Assume action.value is the array of notifications
      //return action.value;
      if (action.status === "success") {
        state = {...state, data: action.value.currencies, dataUpdated: Date()};
      }
      state = {...state, status: action.status, statusType: action.type, error: action.error};
      break;
    }
    default:
      break;
  }
  return state;
};

export default currencyReducer;