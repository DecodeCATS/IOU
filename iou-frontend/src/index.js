import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Connection from './components/pages/Connection';
import Contract from './components/pages/Contract';
import Notification from './components/pages/Notification';

import './index.css';


const routes = (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/connections" component={Connection}/>
        <Route path="/contracts/:id" component={Contract}/>
        <Route path="/notifications" component={Notification}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={Login}/>
      </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('root'));
