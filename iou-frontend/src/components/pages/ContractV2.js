import React, {Component} from 'react';
import {connect} from 'react-redux';
// import * as Contracts from '../../actions/contractActions';
// import { Button, Grid, Col, Alert } from 'react-bootstrap';
// import ReactDOM from 'react-dom'
// import ContractHistoryCard from '../elements/ContractHistoryCard';
import './Contract.css';


class Contract extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect(state => ({ 
  user: state.user, 
  connections: state.connections, 
  organisations: state.organisations,
  notifications: state.notifications,
  contracts: state.contracts,
  payments: state.payments,
  currencies: state.currencies
}))(Contract);