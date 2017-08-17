//Reducer acting on the current user (the guy browsing the app)

const defaultUser = {
  status: '',
  error: '',
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
        state = {...state, data: action.value.users, dataUpdated: Date()};
      }
      state = {...state, status: action.status, error: action.error};
      break;
    }
    case "UPDATE_USER": {
      
    }
    default:
      break;
  }
  return state;
};

export default userReducer;