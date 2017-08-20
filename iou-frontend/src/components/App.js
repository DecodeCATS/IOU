import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
//Needed components
import * as User from '../actions/userActions';
import * as Connections from '../actions/connectionActions';
import * as Notifications from '../actions/notificationActions';
import * as Contracts from '../actions/contractActions';
import * as Payments from '../actions/paymentActions';
import * as Organisations from '../actions/organisationActions';
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
      
      // Console logs
      // console.log("outputting ifs!")
      // console.log(this.props.connections.dataUpdated=== null && (this.props.connections.status!=="pending" && this.props.connections.status!=="error"));
      // console.log(this.props.connections.blacklistUpdated=== null && (this.props.connections.blacklistStatus!=="pending" && this.props.connections.blacklistStatus!=="error"));
      // console.log(this.props.notifications.dataUpdated=== null && (this.props.notifications.status!=="pending" && this.props.notifications.status!=="error"));
      // console.log(this.props.contracts.dataUpdated=== null && (this.props.contracts.status!=="pending" && this.props.contracts.status!=="error"));

      // if (this.props.user.data.userId > 0) {
        // If connection hasn't been refreshed and it's not already fetching, fetch connections
        if (this.props.connections.dataUpdated=== null && (this.props.connections.status!=="pending" && this.props.connections.status!=="error")) {
          this.props.dispatch(Connections.fetchConnections());
        }
        // If blacklist hasn't been refreshed and it's not already fetching, fetch connections
        // if (this.props.connections.blacklistUpdated=== null && (this.props.connections.blacklistStatus!=="pending" && this.props.connections.blacklistStatus!=="error")) {
        //   this.props.dispatch(Connections.fetchBlacklist());
        // }      
        // If notifications haven't been refreshed and it's not already fetching, fetch connections
        if (this.props.notifications.dataUpdated=== null && (this.props.notifications.status!=="pending" && this.props.notifications.status!=="error")) {
          this.props.dispatch(Notifications.fetchNotifications());
        }
        // If contracts haven't been refreshed and it's not already fetching, fetch connections
        if (this.props.contracts.dataUpdated=== null && (this.props.contracts.status!=="pending" && this.props.contracts.status!=="error")) {
            this.props.dispatch(Contracts.fetchContracts());
        }
        // If payments haven't been refreshed and it's not already fetching, fetch connections
        if (this.props.payments.dataUpdated=== null && (this.props.payments.status!=="pending" && this.props.payments.status!=="error")) {
            this.props.dispatch(Payments.fetchActivePayments());
        }
        if (this.props.organisations.dataUpdated=== null && (this.props.organisations.status!=="pending" && this.props.organisations.status!=="error")) {
            this.props.dispatch(Organisations.fetchOrganisations());
        }
        if (this.props.currencies.dataUpdated=== null && (this.props.currencies.status!=="pending" && this.props.currencies.status!=="error")) {
            this.props.dispatch(Currencies.fetchCurrencies());
        }
      // }
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
  organisations: state.organisations,
  currencies: state.currencies
}))(App));
