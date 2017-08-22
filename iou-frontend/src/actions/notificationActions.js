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

export function deleteNotification (notificationId) {
  return function (dispatch) {
    //Send a delete connection type, but send the current user data
    dispatch({type: "DELETE_NOTIFICATION", status: "pending", error: ""});
    Auth.deleteNotification(notificationId)
    .then(res => {
      dispatch({type: "DELETE_NOTIFICATION", status: "success", error: "", value: notificationId});
    })
    .catch(err => {
      dispatch({type: "DELETE_NOTIFICATION", status: "error", error: err});
    });
  };
}
