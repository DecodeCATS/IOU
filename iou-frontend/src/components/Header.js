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
          />
      </div>
    );
  }
}

export default withRouter(connect(state => ({ user: state.user, connections: state.connections, notifications: state.notifications }))(Header));