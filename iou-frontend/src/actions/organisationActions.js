import Auth from '../auth';

export function fetchOrganisations () {
  return function (dispatch) {
    dispatch({type: "FETCH_ORGANISATIONS", status: "pending", error: ""});
    Auth.getOrganisations()
    .then(res => {
      dispatch({type: "FETCH_ORGANISATIONS", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "FETCH_ORGANISATIONS", status: "error", error: err});
    });
  };
}