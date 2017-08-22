import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as Payments from '../../actions/paymentActions';
import './CreatePayment.css';

class CreatePayment extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      contractId: 0,
      currencyId: 1,
      dueDate: "2018-01-01",
      paidDate: "",
      amount: 1000
    };
    
    this.handleContractIdInput = this.handleContractIdInput.bind(this);
    this.handleCurrencyIdInput = this.handleCurrencyIdInput.bind(this);
    this.handleDueDateInput = this.handleDueDateInput.bind(this);
    this.handlePaidDateInput = this.handlePaidDateInput.bind(this);
    this.handleAmountInput = this.handleAmountInput.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.renderContract = this.renderContract.bind(this);
    this.renderCurrency = this.renderCurrency.bind(this);
  }

  handleContractIdInput(e) {
    if (e.target.value !== this.state.contractId) {
      this.setState({
        contractId: e.target.value
      });
    }
  }
  
  handleCurrencyIdInput(e) {
    if (e.target.value !== this.state.currencyId) {
      this.setState({
        currencyId: e.target.value
      });
    }
  }
  
  handleDueDateInput(e) {
    if (e.target.value !== this.state.dueDate) {
      this.setState({
        dueDate: e.target.value
      });
    }
  }
  
  handlePaidDateInput(e) {
    if (e.target.value !== this.state.paidDate) {
      this.setState({
        paidDate: e.target.value
      });
    }
  }

  handleAmountInput(e) {
    if (e.target.value !== this.state.amount) {
      this.setState({
        amount: e.target.value
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let status = "active";
    if (this.state.paidDate) {
      status = "completed";
    }
    
    let thePayment = {
      contractId: +this.state.contractId,
      currencyId: +this.state.currencyId,
      dueDate: this.state.dueDate,
      paidDate: this.state.paidDate,
      amount: +this.state.amount,
      type: "payment",
      status: status
    };
    this.props.dispatch(Payments.addPayment(thePayment));
  }
  // =======================================================================
  // *** Renderers ***
  // =======================================================================
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
    let {contractId, currencyId, dueDate, paidDate, amount} = this.state;
    
    let payingContract = [];
    let currencyList = [];
    
    if (contracts && contracts.data) {
      payingContract = contracts.data.filter(contract =>{
        return (contract.payerId === this.props.user.data.id && contract.isLatest);
      });
    }
    
    if (currencies && currencies.data) {
      // console.log("I have currencies");
      currencyList = currencies.data;
    }
    
    // console.log("Paying contract info");
    // console.log(payingContract);
    // console.log(currencyList);
    
    return (
      <div className="createPaymentPage">
        <form className="paymentForm" onSubmit={this.handleSubmit}>
          <div className="paymentItem paymentContract">
            <p>Contract:</p>
            <select
              ref="contractId"
              className={`${contractId>0 ? "inputGood":"inputBad"}`}
              value={contractId}
              onChange={this.handleContractIdInput}
            >
              <option key="0" value="0">Select contract</option>
              {payingContract.map(contract=>this.renderContract(contract))}
            </select>
          </div>
          <div className="paymentItem currency">
            <p>Currency:</p>
            <select ref="currencyId" value={currencyId} onChange={this.handleCurrencyIdInput}>
              {currencyList.map(currency=>this.renderCurrency(currency))}
            </select>
          </div>
          <div className="paymentItem dueDate">
            <p>Due Date</p>
            <input ref="dueDate" type="date" value={dueDate} onChange={this.handleDueDateInput}/>
          </div>
          <div className="paymentItem paidDate">
            <p>Paid Date</p>
            <input ref="paidDate" type="date" value={paidDate} onChange={this.handlePaidDateInput}/>
          </div>
          <div className="paymentItem amount">
            <p>Amount (in cents):</p>
            <input
              ref="paymentAmount"
              className={`${amount>0 ? "inputGood":"inputBad"}`}
              type="number"
              value={amount}
              onInput={this.handleAmountInput}
            />
          </div>
          <div className="paymentItem button">
              <button type="submit" disabled={(contractId<1 || currencyId<1 || !amount || !dueDate)}>Create Payment</button>
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