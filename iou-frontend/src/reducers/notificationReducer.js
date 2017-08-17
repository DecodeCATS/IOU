//Reducer acting on the notifications

const defaultState = {
  status: "",
  error: "",
  dataUpdated: null,
  data: []
};
//The reducer affecting the contract
const notificationReducer = (state=defaultState, action) => {
  //The reducer cannot return the state directly after a transformation, or else it means that we have changed the original state (immutability)
  switch (action.type) {
    case "FETCH_NOTIFICATIONS": {
      //Basic case to set the connections after a server fetch
      //Assume action.value is the array of connections
      //return action.value;
      if (action.status === "success") {
        state = {...state, data: action.value.notifications, dataUpdated: Date()};
      }
      state = {...state, status: action.status, error: action.error};
      break;
    }
    default:
      break;
  }
  return state;
};

export default notificationReducer;