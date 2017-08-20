import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Connection from './pages/Connection';
import Contract from './pages/Contract';
import CreateContract from './pages/CreateContract';
import Notification from './pages/Notification';
import Payment from './pages/Payment';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import './Main.css';
// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends Component {
  render() {
    return (
      <main className="main">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/Connections' component={Connection}/>
          <Route path='/Contracts' component={Contract}/>
          <Route path='/CreateContract' component={CreateContract}/>
          <Route path='/Notifications' component={Notification}/>
          <Route path='/Payments' component={Payment}/>
          <Route path='/Login' component={Login}/>
          <Route path='/Signup' component={SignUp}/>
          <Route path='/Profile' component={SignUp}/>
        </Switch>
      </main>
    );
  }
}

export default Main;