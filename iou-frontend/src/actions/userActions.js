import Auth from '../auth';

export function fetchUser() {
  return function (dispatch) {
    dispatch({type: "FETCH_USER", status: "pending", error: ""});
    Auth.getUser()
    .then(res => {
      // console.log(`UserInfo=${JSON.stringify(res)}`);
      dispatch({type: "FETCH_USER", status: "success", error: "", value: res});
    })
    .catch(err => {
      dispatch({type: "FETCH_USER", status: "error", error: err});
    });
  };
}

export function checkIsLoggedIn () {
  return function (dispatch) {
    if (Auth.isLoggedIn())
    {
      dispatch({type: "SET_ISLOGGEDIN"});
    }
  };
}

export function loginUser(email, password) {
  return function (dispatch) {
    dispatch({type: "LOGIN_USER", status: "pending", error: ""});
    //Check if there's already a token
    if (!Auth.isLoggedIn()) {
      //No token, need to get one
      Auth.login(email, password)
      .then(res => {
        dispatch({type: "LOGIN_USER", status: "success", error: ""});
      })
      .catch(err => {
        dispatch({type: "LOGIN_USER", status: "error", error: err});
      });
    } else {
      //User is already logged in!
      dispatch({type: "LOGIN_USER", status: "success", error: ""});
    }
  }; 
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({type: "LOGOUT_USER", status: "pending", error: ""});
    Auth.logout()
    .then(res => {
      dispatch({type: "LOGOUT_USER", status: "success", error: ""});
    })
    .catch(err => {
      dispatch({type: "LOGOUT_USER", status: "error", error: err});
    });
  };
}

export function signupUser(userInfo) {
  return function (dispatch) {
    
  };
}