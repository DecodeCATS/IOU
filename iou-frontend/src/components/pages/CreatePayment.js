import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as Payments from '../../actions/paymentActions';
import './CreatePayment.css';

class CreatePayment extends Component {
  constructor(props) {
    super(props);
    this.renderContract = this.renderContract.bind(this);
  }
  
  renderContract(contract) {
    // console.log(connection);
    return (
      <option key={contract.id} value={contract.id}>{contract.title}</option>
    );
  }
  
  render(){
    let payingContract = this.props.contracts.data.filter(contract =>{
      return (contract.payerId === this.props.user.data.id && contract.isLatest);
    });
    
    console.log("Paying contract info");
    console.log(payingContract);
    
    return (
      <div>
        <form className="paymentForm">
          <div className="selectors">
            <select ref="contractId">
              {payingContract.map(contract=>this.renderContract(contract))}
            </select>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(state => ({ 
  connections: state.connections,
  organisations: state.organisations,
  contracts: state.contracts, 
  payments: state.payments,
  user: state.user
}))(CreatePayment);