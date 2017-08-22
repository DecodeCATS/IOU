//Reducer acting on the current user (the guy browsing the app)

const defaultUser = {
  status: '',
  error: '',
  isLoggedIn: false,
  data: {
    userId: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: ''
  }
};

const userReducer = (state=defaultUser, action) => {
  switch (action.type) {
    case "FETCH_USER": {
      if (action.status === "success") {
        state = {...state, data: action.value, dataUpdated: Date()};
      }
      state = {...state, status: action.status, error: action.error};
      break;
    }
    case "LOGIN_USER": {
      if (action.status === "success") {
        state = {...state, data: defaultUser.data, isLoggedIn: true, dataUpdated: Date()};
      }
      state = {...state, status: action.status, error: action.error};
      break;
    }
    case "LOGOUT_USER": {
      if (action.status === "success") {
        state = {...state, data: defaultUser.data, isLoggedIn: false, dataUpdated: Date()};
      }
      state = {...state, status: action.status, error: action.error};
      break;
    }
    case "SET_ISLOGGEDIN": {
      state = {...state, isLoggedIn: true};
      break;
    }
    case "UPDATE_USER": {
      break;
    }
    default:
      break;
  }
  return state;
};

export default userReducer;