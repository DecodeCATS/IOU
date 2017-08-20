import Auth from '../auth';

export function acceptConnection (connectionUserId) {
  return function (dispatch) {
    dispatch({type: "ACCEPT_CONNECTION", status: "pending", error: ""});
    Auth.addConnection(connectionUserId)
    .then(res => {
      dispatch({type: "ACCEPT_CONNECTION", status: "success", error: "", value: connectionUserId});
    })
    .catch(err => {
      dispatch({type: "DELETE_CONNECTION", status: "error", error: err});
    });
  };
}

export function addConnection (connectionUserId) {
  return function (dispatch) {
    dispatch({type: "ADD_CONNECTION", status: "pending", error: ""});
    Auth.addConnection(connectionUserId)
    .then(res => {
      dispatch({type: "ADD_CONNECTION", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "ADD_CONNECTION", status: "error", error: err});
    });
  };
}

export function deleteConnection (connectionUserId) {
  return function (dispatch) {
    //Send a delete connection type, but send the current user data
    dispatch({type: "DELETE_CONNECTION", status: "pending", error: ""});
    Auth.deleteConnection(connectionUserId)
    .then(res => {
      dispatch({type: "DELETE_CONNECTION", status: "success", error: "", value: connectionUserId});
    })
    .catch(err => {
      dispatch({type: "DELETE_CONNECTION", status: "error", error: err, value: {users:[]}});
    });
  };
}

export function fetchConnections () {
  return function (dispatch) {
    dispatch({type: "FETCH_CONNECTIONS", status: "pending", error: ""});
    Auth.getConnections()
    .then(res => {
      dispatch({type: "FETCH_CONNECTIONS", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "FETCH_CONNECTIONS", status: "error", error: err});
    });
  };
}

export function requestConnection(connectionUserId) {
  //Requesting a connection returns a 204 (no data) when success
  return function (dispatch) {
    dispatch({type: "REQUEST_CONNECTION", status: "pending", error: ""});
    Auth.requestConnection(connectionUserId)
    .then(res => {
      dispatch({type: "REQUEST_CONNECTION", status: "success", error: ""});
    })
    .catch(err => {
      dispatch({type: "REQUEST_CONNECTION", status: "error", error: err});
    });
  };
}

export function fetchBlacklist() {
  return function (dispatch) {
    dispatch({type: "FETCH_BLACKLIST", status: "pending", error: ""});
    Auth.getBlacklist()
    .then(res => {
      dispatch({type: "FETCH_BLACKLIST", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "FETCH_BLACKLIST", status: "error", error: err});
    });
  };
}

export function addBlacklist (connectionUserId) {
  return function (dispatch) {
    //Send a delete connection type, but send the current user data
    dispatch({type: "ADD_BLACKLIST", status: "pending", error: ""});
    Auth.addBlacklist(connectionUserId)
    .then(res => {
      dispatch({type: "ADD_BLACKLIST", status: "success", error: "", value: connectionUserId});
    })
    .catch(err => {
      dispatch({type: "ADD_BLACKLIST", status: "error", error: err});
    });
  };
}

export function deleteBlacklist (connectionUserId) {
  return function (dispatch) {
    //Send a delete connection type, but send the current user data
    dispatch({type: "DELETE_BLACKLIST", status: "pending", error: ""});
    Auth.deleteBlacklist(connectionUserId)
    .then(res => {
      dispatch({type: "DELETE_BLACKLIST", status: "success", error: "", value: connectionUserId});
    })
    .catch(err => {
      dispatch({type: "DELETE_BLACKLIST", status: "error", error: err});
    });
  };
}

// export function searchConnections (username, email, firstName, lastName) {
//   return function (dispatch) {
//     
//     dispatch({type: "DELETE_BLACKLIST", status: "pending", error: ""});
//     Auth.searchConnections(username, email, firstName, lastName)
//     .then(res => {
//       dispatch({type: "DELETE_BLACKLIST", status: "success", error: "", value: connectionUserId});
//     })
//     .catch(err => {
//       dispatch({type: "DELETE_BLACKLIST", status: "error", error: err});
//     });
//   };
// }