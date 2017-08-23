//Reducer acting on the connections

//From the point of view of the application, a connection is simply a user, so even though we call this connection, we deal with a db(users) array
const defaultState = {
  status: "",
  error: "",
  dataUpdated: null,
  data: [],
  // blacklistStatus: "",
  // blacklistError: "",
  // blacklistUpdated: null,
  // blacklistData: [],
  searchUpdated: null,
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
        let existingConnections = state.data.map(connection => {
          if (connection.id !== action.value){
            // console.log(connection, 'action value' +action.value);
            return connection;
          }
        });
        state = {...state, data: existingConnections, dataUpdated: Date()};
        state.data = action.value.users;
      }
      state = {...state, status: action.status, error: action.error};
      break;
    }

      // case "DELETE_BLACKLIST": {
      //     if (action.status === 'success') {
      //         let remainingData = state.data.map(user => {
      //             // If it's not the connection was un-muted we will set isBlacklisted status to 0 and return a new object
      //             //Otherwise just return an existing user object
      //             if (user.id === action.value) {
      //                 user.isBlacklisted = 0;
      //                 return user;
      //             } else {
      //                 return user;
      //             }
      //         });
      //         //Update the connections data and the update date
      //         state = {...state, data: remainingData, dataUpdated: Date()};
      //     }
      //     //Update the rest of the info
      //     state = {...state, status: action.status, error: action.error};
      //     break;
      // }
    
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
    
    // case "FETCH_BLACKLIST": {
    //   if (action.status === "success") {
    //     state = {...state, blacklistData: action.value.blacklist, blacklistUpdated: Date()};
    //     // console.log(`BlacklistData=${JSON.stringify(state.blacklistData)}`);
    //   }
    //   state = {...state, blacklistStatus: action.status, blacklistError: action.error};
    //   break;
    // }
    
    case "ADD_BLACKLIST": {
      if (action.status === "success") {
        state = {...state, data: action.value.blacklist, dataUpdated: Date()};
        // console.log(`BlacklistData=${JSON.stringify(state.blacklistData)}`);
      }
      state = {...state, status: action.status, error: action.error};
      break;
    }

      case "DELETE_BLACKLIST": {
          if (action.status === 'success') {
              let remainingData = state.data.map(user => {
                  // If it's not the connection was un-muted we will set isBlacklisted status to 0 and return a new object
                  //Otherwise just return an existing user object
                  if (user.id === action.value) {
                      user.isBlacklisted = 0;
                      return user;
                  } else {
                      return user;
                  }
              });
        //Update the connections data and the update date
        state = {...state, data: remainingData, dataUpdated: Date()};
      }
      //Update the rest of the info
      state = {...state, status: action.status, error: action.error};
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

export default connectionReducer;