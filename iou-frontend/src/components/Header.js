import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
//Needed components
import * as User from '../actions/userActions';
import Menu from './modals/Menu';

import './Header.css';

class Header extends Component {
  constructor(){
    super();
    this.state = {
      isMenuOpen: false
    };
  }

  closeMenu = () => this.setState({isMenuOpen: false})
  
  logout = () => {
    // console.log("Logging out");
    this.props.dispatch(User.logoutUser());
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
      <div className="App-navbar">
          <i className="fa fa-user-circle fa-4x menu-icon"
             onClick={() => this.setState({isMenuOpen: !isMenuOpen})}
          />
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
          />
      </div>
    );
  }
}

export default withRouter(connect(state => ({ user: state.user, connections: state.connections, notifications: state.notifications }))(Header));