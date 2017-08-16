//Reducer acting on the connections

//From the point of view of the application, a connection is simply a user, so even though we call this connection, we deal with a db(users) array

//The reducer affecting the connections
const connectionReducer = (state=[], action) => {
  //The reducer cannot return the state directly after a transformation, or else it means that we have changed the original state (immutability)
  switch (action.type) {
    case "ADD_CONNECTION": {
      state = [...state,action.connection];
      break;
    }
    default:
      return state;
  }
};

export default connectionReducer;