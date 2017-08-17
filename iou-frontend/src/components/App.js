import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
//Needed components
import * as User from '../actions/userActions';
import * as Connections from '../actions/connectionActions';
import * as Notifications from '../actions/notificationActions';

import Header from './Header';
import Main from './Main';
import './App.css';

class App extends Component {
  componentWillMount() {
    //Every page needs connection and notification info, might as well load them here
    this.props.dispatch(User.checkIsLoggedIn());
    if (this.props.user.isLoggedIn) {
      // console.log("Fetching connections");
      // this.props.dispatch(User.fetchUser());
      // this.props.dispatch(Connections.fetchConnections());
      // this.props.dispatch(Notifications.fetchNotifications());
    }
  }
  
  componentDidUpdate() {
    // If the user is logged
    if (this.props.user.isLoggedIn) {
      // If there's no data on the user and it's not fetching, fetch user info
      if (this.props.user.data.userId === 0 && this.props.user.status==="") {
        // console.log("Fetching connections");
        this.props.dispatch(User.fetchUser());
      }
      // If there's no connection and it's not already fetching, fetch connections
      if (this.props.connections.data.length === 0 && this.props.connections.status==="") {
        this.props.dispatch(Connections.fetchConnections());
      }
      // If there's no connection and it's not already fetching, fetch connections
      if (this.props.notifications.data.length === 0 && this.props.notifications.status==="") {
        this.props.dispatch(Notifications.fetchNotifications());
      }
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



export default withRouter(connect(state => ({ user: state.user, connections: state.connections, notifications: state.notifications }))(App));
