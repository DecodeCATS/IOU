import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
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
    return (
      <div className="App-navbar">
          <i className="fa fa-user-circle fa-4x menu-icon"
             onClick={() => this.setState({isMenuOpen: !isMenuOpen})}
          />
          <Link to="/" className="App-navbar__title">{this.state.title}</Link>
          
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