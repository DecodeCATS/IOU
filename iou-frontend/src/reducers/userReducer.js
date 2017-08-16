//Reducer acting on the current user (the guy browsing the app)

const defaultUser = {
  id: 0,
  username: '',
  firstName: '',
  lastName: ''
};

const userReducer = (state=defaultUser, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;