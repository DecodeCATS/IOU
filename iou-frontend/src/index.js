import React from 'react';
import ReactDOM from 'react-dom';
import { /*Router, Route,*/ BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {iouStore} from './store';

import App from './components/App';


import './index.css';
// import registerServiceWorker from './registerServiceWorker';

// let store = createStore(todoApp);

ReactDOM.render(
  <Provider store={iouStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);
// registerServiceWorker();
