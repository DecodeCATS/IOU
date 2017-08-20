//Reducer acting on the connections

//From the point of view of the application, a connection is simply a user, so even though we call this connection, we deal with a db(users) array
const defaultState = {
    status: "",
    statusType: "",
    error: "",
    dataUpdated: null,
    data: []
};

//The reducer affecting the connections
const contractReducer = (state=defaultState, action) => {
    //The reducer cannot return the state directly after a transformation, or else it means that we have changed the original state (immutability)
    switch (action.type) {
        case "FETCH_ALL_CONTRACTS": {
            if (action.status === "success") {
                state = {...state, data: action.value.contracts, dataUpdated: Date()};
            }
            state = {...state, status: action.status, statusType: action.type, error: action.error};
            break;
        }

        case "ADD_CONTRACT": {
            if (action.status === "success") {
                state = {...state, data: action.value.contracts, dataUpdated: Date()};
            }
            state = {...state, status: action.status, statusType: action.type, error: action.error};
            break;
        }
        
        default:
            break;
    }
    return state;
};

export default contractReducer;