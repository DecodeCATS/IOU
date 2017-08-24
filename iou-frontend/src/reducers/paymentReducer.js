

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
    
    case "ADD_PAYMENT": {
      if (action.status === "success") {
        state = {...state, data: action.value.payments, dataUpdated: Date()};
      }
      state = {...state, status: action.status, statusType: action.type, error: action.error};
      break;
    }

    case "DELETE_PAYMENT": {
      //Filter returns a new array object
      if (action.status === 'success') {
        let remainingData = state.data.filter(payment => {
          //If it's not the payment we want to delete, return true
          return payment.id !== action.value;
        });
        //Update the connections data and the update date
        state = {...state, data: remainingData, dataUpdated: Date()};
      }
      //Update the rest of the info
      state = {...state, status: action.status, statusType: action.type, error: action.error};
      break;
    }
    case "LOGOUT_USER": {
      if (action.status === "success") {
        state = {...state, data: defaultState.data, dataUpdated: null};
      }
      state = {...state, status: action.status, statusType: action.type, error: action.error};
      break;
    }
    case "COMPLETE_PAYMENT": {
      if (action.status === "success") {
        let newData = state.data.map(payment => {
          if (payment.paymentId === action.value.paymentId) {
            return action.value;
          }
          else {
            return payment;
          }
        });
        state = {...state, data: newData, dataUpdated: null};
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