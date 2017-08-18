// import config from '../config'

//Reducer acting on the contracts
let defaultContracts = {
    status: '',
    error: '',
    data: [],
    dataUpdated: null
}

//The reducer affecting the contract
const contractReducer = (state=defaultContracts, action) => {
  //The reducer cannot return the state directly after a transformation, or else it means that we have changed the original state (immutability)
  switch (action.type) {
      case "FETCH_ALL_CONTRACTS": {
          if (action.status==='success'){
              state = {...state, data: action.value.contracts, dataUpdated: Date()};
          }
          state = {...state, status: action.status, error: action.error}
        break;
      }
      case "FETCH_SINGLE_CONTRACT": {
          state.data = state.filter(contracts => {

              return contracts.id === action.value.contracts.id;
          })
          break;
      }
    default:
        break;
  }
    return state;
};

export default contractReducer;