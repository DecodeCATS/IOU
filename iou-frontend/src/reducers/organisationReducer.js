//Reducer acting on the connections

//From the point of view of the application, a connection is simply a user, so even though we call this connection, we deal with a db(users) array
const defaultState = {
  status: "",
  error: "",
  dataUpdated: null,
  data: []
};

//The reducer affecting the connections
const organisationReducer = (state=defaultState, action) => {
  //The reducer cannot return the state directly after a transformation, or else it means that we have changed the original state (immutability)
  switch (action.type) {
    case "FETCH_ORGANISATIONS": {
      //Basic case to set the connections after a server fetch
      //Assume action.value is the array of connections
      //return action.value;
      if (action.status === "success") {
        state = {...state, data: action.value.users, dataUpdated: Date()};
      }
      state = {...state, status: action.status, error: action.error};
      break;
    }
    
    default:
      break;
  }
  return state;
};

export default organisationReducer;