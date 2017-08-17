import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//Needed components
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
  
  render(){
    let {isMenuOpen} = this.state;
    return (
      <div className="App-navbar">
          <i className="fa fa-id-badge fa-4x menu-icon"
             onClick={() => this.setState({isMenuOpen: !isMenuOpen})}
          />
          <Link to="/" className="App-navbar__title">{this.state.title}</Link>
          
          <Menu show={isMenuOpen} closeMenu={this.closeMenu}/>
      </div>
    );
  }
}

export default Header;
