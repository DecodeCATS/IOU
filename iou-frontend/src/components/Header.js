import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
//Needed components
import * as User from '../actions/userActions';
import * as Connections from '../actions/connectionActions';
import * as Organisations from '../actions/organisationActions';
import * as Notifications from '../actions/notificationActions';
import * as Contracts from '../actions/contractActions';
import * as Payments from '../actions/paymentActions';
import * as Currencies from '../actions/currencyActions';
import Menu from './modals/Menu';

import './Header.css';

class Header extends Component {
  constructor(){
    super();
    this.state = {
      isMenuOpen: false
    };
    
    this.fetchUser = this.fetchUser.bind(this);
    this.fetchContracts = this.fetchContracts.bind(this);
    this.fetchPayments = this.fetchPayments.bind(this);
    this.fetchConnections = this.fetchConnections.bind(this);
    this.fetchOrganisations = this.fetchOrganisations.bind(this);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.fetchNotifications = this.fetchNotifications.bind(this);
  }

  closeMenu = () => this.setState({isMenuOpen: false})
  
  logout = () => {
    // console.log("Logging out");
    this.props.dispatch(User.logoutUser());
  }
  
  fetchUser(e){this.props.dispatch(User.fetchUser());}
  
  fetchContracts(e){this.props.dispatch(Contracts.fetchContracts());}
  
  fetchPayments(e){this.props.dispatch(Payments.fetchActivePayments());}
  
  fetchConnections(e){
    this.props.dispatch(Connections.fetchConnections());
    // this.props.dispatch(Connections.fetchBlacklist());
  }
  fetchOrganisations(e){this.props.dispatch(Organisations.fetchOrganisations());}
  
  fetchCurrencies(e){this.props.dispatch(Currencies.fetchCurrencies());}
  fetchNotifications(e){this.props.dispatch(Notifications.fetchNotifications());}
  
  renderAvatar = () => {
    let {isMenuOpen} = this.state;
    // console.log(this.props.user.isLoggedIn);
    if(this.props.user.isLoggedIn) {
      if (this.props.user.data.avatarUrl) {
        return (
          <img src={this.props.user.data.avatarUrl} alt="profile-pic" className="menu__avatar menu-icon" onClick={() => this.setState({isMenuOpen: !isMenuOpen})}/>
        );
      }
      else {
        return (
          <i className="fa fa-id-card fa-5x menu-icon"
               onClick={() => this.setState({isMenuOpen: !isMenuOpen})}
          />
        );
      }
    } else {
      return (
        <i className="fa fa-user-circle fa-5x menu-icon"
             onClick={() => this.setState({isMenuOpen: !isMenuOpen})}
        />
      );
    }
  }
  
  render(){
    let {isMenuOpen} = this.state;
    // Fetch the path from locations
    let {pathname} = this.props.location;
    // If homepage
    if (pathname==='/') {
      pathname = "Home";
    }
    // Capitalize path
    pathname = pathname.replace('/','');
    pathname = pathname[0].toUpperCase() + pathname.slice(1);
    // console.log(`Current path= ${pathname}`);
    return (
      <div className="header">
        <div className="App-navbar">
            <div>
              {this.renderAvatar()}
            </div>
            <div className="App-navbar__title">{pathname}</div>
            <div>
            </div>
            <Menu 
              show={isMenuOpen}
              closeMenu={this.closeMenu}
              logout={this.logout}
              user={this.props.user}
              connections={this.props.connections}
              notifications={this.props.notifications}
              contracts={this.props.contracts}
              payments={this.props.payments}
            />
        </div>
        <div className="developper">
          <p>Developper Mode:</p>
          <div className="buttons">
            <button className={this.props.user.status} type="button" onClick={this.fetchUser}>User Info</button>
            <button className={this.props.contracts.status} type="button" onClick={this.fetchContracts}>Contracts</button>
            <button className={this.props.payments.status} type="button" onClick={this.fetchPayments}>Payments</button>
            <button className={this.props.connections.status} type="button" onClick={this.fetchConnections}>Connections</button>
            <button className={this.props.organisations.status} type="button" onClick={this.fetchOrganisations}>Organisations</button>
            <button className={this.props.currencies.status} type="button" onClick={this.fetchCurrencies}>Currencies</button>
            <button className={this.props.notifications.status} type="button" onClick={this.fetchNotifications}>Notifications</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(state => ({ 
  user: state.user, 
  connections: state.connections, 
  organisations: state.organisations,
  notifications: state.notifications,
  contracts: state.contracts,
  payments: state.payments,
  currencies: state.currencies
}))(Header));