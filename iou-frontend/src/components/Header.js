import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(){
    super();
    this.state = {
      isMenuOpen: false
    };
  }
  
  render(){
    let {isMenuOpen} = this.state;
    return (
      <div className="App-navbar">
          <i className="fa fa-bars fa-2x menu-icon"
             onClick={() => this.setState({isMenuOpen: !isMenuOpen})}
          />
          <Link to="/" className="App-navbar__title">{this.state.title}</Link>
      </div>
    );
  }
}

export default Header;
