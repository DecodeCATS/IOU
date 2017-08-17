import Auth from '../auth';

export function fetchUser () {
  return function (dispatch) {
    dispatch({type: "FETCH_USER", status: "pending", error: "", value: {}});
    Auth.getConnections()
    .then(res => {
      dispatch({type: "FETCH_USER", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "FETCH_USER", status: "error", error: err, value: {}});
    });
  };
}