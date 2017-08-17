import Auth from '../auth';

export function fetchNotifications () {
  return function (dispatch) {
    dispatch({type: "FETCH_NOTIFICATIONS", status: "pending", error: "", value: {notifications:[]}});
    Auth.getNotifications()
    .then(res => {
      dispatch({type: "FETCH_NOTIFICATIONS", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "FETCH_NOTIFICATIONS", status: "error", error: err, value: {notifications:[]}});
    });
  };
}