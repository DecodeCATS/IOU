import { combineReducers, createStore } from 'redux';
import connectionReducer from './reducers/connectionReducer';
import contractReducer from './reducers/contractReducer';
import notificationReducer from './reducers/notificationReducer';
import paymentReducer from './reducers/paymentReducer';
import userReducer from './reducers/userReducer';

const reducers = combineReducers({
  connections: connectionReducer,
  contracts: contractReducer,
  notifications: notificationReducer,
  payment: paymentReducer,
  user: userReducer
});

const iouStore = createStore(reducers);

export default iouStore;