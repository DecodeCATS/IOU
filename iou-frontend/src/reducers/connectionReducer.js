//Reducer acting on the connections

//From the point of view of the application, a connection is simply a user, so even though we call this connection, we deal with a db(users) array

//The reducer affecting the connections
const connectionReducer = (state=[], action) => {
  //The reducer cannot return the state directly after a transformation, or else it means that we have changed the original state (immutability)
  switch (action.type) {
    case "SET_CONNECTIONS": {
      //Basic case to set the connections after a server fetch
      //Assume action.value is the array of connections
      return action.value;
    }
    case "ADD_CONNECTION": {
      //Action.value has all the connection information.
      state = [...state, action.value];
      break;
    }
    case "DELETE_CONNECTION": {
      //Filter returns a new array object
      state = state.filter(connection => {
        //If it's not the connection we want to delete, return true
        return connection.id !== action.value.id;
      });
      break;
    }
    case "UPDATE_CONNECTION": {
      state = state.map(connection => {
        if (connection.id === action.value.id) {
          //If the userId of the connection is the same as the one we want to modify, return the new user info
          return action.value;
        } else {
          //Else, return the connection
          return connection;
        }
      });
    }
  }
  return state;
};

export default connectionReducer;