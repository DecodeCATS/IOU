import Auth from '../auth';

export function acceptConnection (connectionUserId) {
  return function (dispatch) {
    dispatch({type: "ADD_CONNECTION", status: "pending", error: ""});
    Auth.addConnection(connectionUserId)
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
