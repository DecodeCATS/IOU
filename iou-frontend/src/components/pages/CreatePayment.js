import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as Payments from '../../actions/paymentActions';
import './CreatePayment.css';

class CreatePayment extends Component {
  constructor(props) {
    super(props);
    this.renderContract = this.renderContract.bind(this);
    this.renderCurrency = this.renderCurrency.bind(this);
  }
  
  renderContract(contract) {
    // console.log(connection);
    return (
      <option key={contract.id} value={contract.id}>{contract.title}</option>
    );
  }
  
  renderCurrency(currency) {
    return (
      <option key={currency.currencyId} value={currency.currencyId}>{currency.name}{`${currency.symbol ? "("+currency.symbol+")" : null}`}</option>
    );
  }
  
  render(){
    let {contracts, currencies} = this.props;
    
    let payingContract = [];
    let currencyList = [];
    
    if (contracts && contracts.data) {
      payingContract = contracts.data.filter(contract =>{
        return (contract.payerId === this.props.user.data.id && contract.isLatest);
      });
    }
    
    if (currencies && currencies.data) {
      console.log("I have currencies");
      currencyList = currencies.data;
    }
    
    // console.log("Paying contract info");
    // console.log(payingContract);
    console.log(currencyList);
    
    return (
      <div>
        <form className="paymentForm">
          <div className="selectors">
            <select ref="contractId">
              {payingContract.map(contract=>this.renderContract(contract))}
            </select>
            <select ref="currencyId">
              {currencyList.map(currency=>this.renderCurrency(currency))}
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
  currencies: state.currencies,
  user: state.user
}))(CreatePayment);