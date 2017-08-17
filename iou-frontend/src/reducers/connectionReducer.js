//Reducer acting on the connections

//From the point of view of the application, a connection is simply a user, so even though we call this connection, we deal with a db(users) array
const defaultState = {
  status: "",
  error: "",
  dataUpdated: null,
  data: [],
  searchData: []
};

//The reducer affecting the connections
const connectionReducer = (state=defaultState, action) => {
  //The reducer cannot return the state directly after a transformation, or else it means that we have changed the original state (immutability)
  switch (action.type) {
    case "FETCH_CONNECTIONS": {
      //Basic case to set the connections after a server fetch
      //Assume action.value is the array of connections
      //return action.value;
      if (action.status === "success") {
        state = {...state, data: action.value.users, dataUpdated: Date()};
      }
      state = {...state, status: action.status, error: action.error};
      break;
    }
    
    case "SEARCH_CONNECTION": {
      if (action.status === "success") {
        //Need to dump search result in a separate array
        state = {...state, searchData: action.value.users};
      }
      state = {...state, status: action.status, error: action.error};
      break;
    }
    
    case "REQUEST_CONNECTION": {
      //Does requesting a connection need to update the state???
      state = {...state, status: action.status, error: action.error};
      break;
    }
    
    case "ADD_CONNECTION": {
      if (action.status === "success") {
        state = {...state, data: action.value.users, dataUpdated: Date()};
      }
      state = {...state, status: action.status, error: action.error};
      break;
    }
    
    case "DELETE_CONNECTION": {
      //Filter returns a new array object
      if (action.status === 'success') {
        let remainingData = state.data.filter(connection => {
          //If it's not the connection we want to delete, return true
          return connection.id !== action.value;
        });
        //Update the connections data and the update date
        state = {...state, data: remainingData, dataUpdated: Date()};
      }
      //Update the rest of the info
      state = {...state, status: action.status, error: action.error};
      break;
    }
    // *** Don't need this scenario I think ***
    // case "UPDATE_CONNECTION": {
    //   state.data = state.map(connection => {
    //     if (connection.id === action.value.id) {
    //       //If the userId of the connection is the same as the one we want to modify, return the new user info
    //       return action.value;
    //     } else {
    //       //Else, return the connection
    //       return connection;
    //     }
    //   });
    //   break;
    // }
    default:
      break;
  }
  return state;
};

export default connectionReducer;