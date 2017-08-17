import React, { Component } from 'react';
import {connect} from 'react-redux';
//Needed components
import * as User from '../actions/userActions';

import Header from './Header';
import Main from './Main';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(User.checkIsLoggedIn());
    if (this.props.user.isLoggedIn) {
      console.log("Fetching connections");
      this.props.dispatch(User.fetchUser());
    }
  }
  
  componentDidUpdate() {
    if (this.props.user.isLoggedIn && this.props.user.data.userId === 0 && this.props.user.status==="") {
      console.log("Fetching connections");
      this.props.dispatch(User.fetchUser());
    }
  }
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default connect(state => ({ user: state.user }))(App);
