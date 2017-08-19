import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';


import connectionReducer from './reducers/connectionReducer';
import contractReducer from './reducers/contractReducer';
import currencyReducer from './reducers/currencyReducer';
import notificationReducer from './reducers/notificationReducer';
import paymentReducer from './reducers/paymentReducer';
import userReducer from './reducers/userReducer';

const reducers = combineReducers({
  connections: connectionReducer,
  contracts: contractReducer,
  notifications: notificationReducer,
  payment: paymentReducer,
  user: userReducer,
  currency: currencyReducer
});

const middleware = applyMiddleware(thunkMiddleware, logger);

const iouStore = createStore(reducers, middleware);

export default iouStore;