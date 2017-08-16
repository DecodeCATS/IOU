import {applyMiddleware, createStore} from 'redux';
import axios from 'axios';

// import config from '../config'

//Reducer acting on the contracts


//The reducer affecting the contract
const contractReducer = (state=[], action) => {
  //The reducer cannot return the state directly after a transformation, or else it means that we have changed the original state (immutability)
  switch (action.type) {
    default:
      return state;
  }
};

const middleware = applyMiddleware(thunk, logger())
const store = createStore(contractReducer, middleware)

store.dispatch((dispatch) => {
  dispatch({type: "FETCH_CONTRACTS"})
    axios.get("https://private-aee43-decodecatsiouct.apiary-mock.com/contracts")
    // dispatch({type: "User was fetched"})
        .then(function(result)  {
          console.log(result);
        })
});


export default contractReducer;