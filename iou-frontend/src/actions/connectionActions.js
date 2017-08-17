import Auth from '../auth';

export function fetchConnections () {
  return function (dispatch) {
    dispatch({type: "FETCH_CONNECTIONS", status: "pending", error: "", value: {users:[]}});
    Auth.getConnections()
    .then(res => {
      dispatch({type: "FETCH_CONNECTIONS", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "FETCH_CONNECTIONS", status: "error", error: err, value: {users:[]}});
    });
  };
}

export function deleteConnection (userId) {
  return function (dispatch) {
    //Send a delete connection type, but send the current user data
    dispatch({type: "DELETE_CONNECTION", status: "pending", error: ""});
    Auth.deleteConnection(userId)
    .then(res => {
      dispatch({type: "DELETE_CONNECTION", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "DELETE_CONNECTION", status: "error", error: err, value: {users:[]}});
    });
  };
}