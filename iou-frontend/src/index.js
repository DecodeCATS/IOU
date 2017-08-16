import React from 'react';
import ReactDOM from 'react-dom';
import { /*Router, Route,*/ BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';

import App from './components/App';


import './index.css';
// import registerServiceWorker from './registerServiceWorker';

// let store = createStore(todoApp);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root')
);
// registerServiceWorker();
