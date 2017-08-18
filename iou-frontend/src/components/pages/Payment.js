import React, {Component} from 'react';
// import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Styling
import './Payment.css';

//This is a smart component. It is aware of the store
class Payment extends Component {
  render() {
    return (
      <div>Payment Page!
      </div>
    );
  }
}

export default connect(state => ({ user: state.user, connections: state.connections }))(Payment);