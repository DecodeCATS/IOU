//Reducer acting on the contracts

//The reducer affecting the contract
const notificationReducer = (state=[], action) => {
  //The reducer cannot return the state directly after a transformation, or else it means that we have changed the original state (immutability)
  switch (action.type) {
    default:
      return state;
  }
};

export default notificationReducer;