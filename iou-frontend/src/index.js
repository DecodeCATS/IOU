import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Contract from './components/pages/Contract';

import './index.css';


const routes = (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/contracts/:id" component={Contract}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={Login}/>
      </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('root'));
