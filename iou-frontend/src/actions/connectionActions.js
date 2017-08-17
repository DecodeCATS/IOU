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

