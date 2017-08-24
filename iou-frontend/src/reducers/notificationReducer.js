//Reducer acting on the notifications

const defaultState = {
  status: "",
  statusType: "",
  error: "",
  dataUpdated: null,
  data: []
};
//The reducer affecting the contract
const notificationReducer = (state=defaultState, action) => {
  //The reducer cannot return the state directly after a transformation, or else it means that we have changed the original state (immutability)
  switch (action.type) {
    case "FETCH_NOTIFICATIONS": {
      //Basic case to set the notifications after a server fetch
      //Assume action.value is the array of notifications
      //return action.value;
      if (action.status === "success") {
        state = {...state, data: action.value.notifications, dataUpdated: Date()};
      }
      state = {...state, status: action.status, statusType: action.type, error: action.error};
      break;
    }
    
    case "DELETE_NOTIFICATION": {
      //Filter returns a new array object
      if (action.status === 'success') {
        let remainingData = state.data.filter(notification => {
          //If it's not the notification we want to delete, return true
          return notification.id !== action.value;
        });
        //Update the notification data and the update date
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
      state = {...state, status: action.status, actionType: action.type, error: action.error};
      break;
    }
    default:
      break;
  }
  return state;
};

export default notificationReducer;