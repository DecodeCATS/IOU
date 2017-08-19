import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
//Needed components
import * as User from '../actions/userActions';
import * as Connections from '../actions/connectionActions';
import * as Notifications from '../actions/notificationActions';
import * as Contracts from '../actions/contractActions';
import * as Payments from '../actions/paymentActions';
import * as Currencies from '../actions/currencyActions';

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
      if (this.props.user.data.userId === 0 && (this.props.user.status!=="pending" && this.props.user.status!=="error")) {
        // console.log("Fetching connections");
        this.props.dispatch(User.fetchUser());
      }
      // If connection hasn't been refreshed and it's not already fetching, fetch connections
      if (this.props.connections.dataUpdated && (this.props.connections.status!=="pending" && this.props.connections.status!=="error")) {
        this.props.dispatch(Connections.fetchConnections());
      }
      // If blacklist hasn't been refreshed and it's not already fetching, fetch connections
      if (this.props.connections.blacklistUpdated && (this.props.connections.blacklistStatus!=="pending" && this.props.connections.blacklistStatus!=="error")) {
        this.props.dispatch(Connections.fetchBlacklist());
      }      
      // If notifications haven't been refreshed and it's not already fetching, fetch connections
      if (this.props.notifications.dataUpdated && (this.props.notifications.status!=="pending" && this.props.notifications.status!=="error")) {
        this.props.dispatch(Notifications.fetchNotifications());
      }
      // If contracts haven't been refreshed and it's not already fetching, fetch connections
      if (this.props.contracts.dataUpdated && (this.props.contracts.status!=="pending" && this.props.contracts.status!=="error")) {
          this.props.dispatch(Contracts.fetchContracts());
      }
      // If payments haven't been refreshed and it's not already fetching, fetch connections
      if (this.props.payments.dataUpdated && (this.props.payments.status!=="pending" && this.props.payments.status!=="error")) {
          this.props.dispatch(Payments.fetchActivePayments());
      }
      if (this.props.currencies.dataUpdated && (this.props.currencies.status!=="pending" && this.props.currencies.status!=="error")) {
          this.props.dispatch(Currencies.fetchCurrencies());
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



export default withRouter(connect(state => ({
  user: state.user,
  connections: state.connections,
  notifications: state.notifications,
  contracts: state.contracts,
  payments: state.payments,
  currencies: state.currencies
}))(App));
