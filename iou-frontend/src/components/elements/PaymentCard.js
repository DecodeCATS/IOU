import React, {Component} from 'react';

import './PaymentCard.css';

export default class PaymentCard extends Component {
  constructor(props){
    super(props);
    
    this.defaultProps = {
      
      // Payment object expected
      payment: {
        id: 0,
        contractId: 0,
        currencyId: 0,
        amount: 0,
        dueDate: '',
        paymentDate: '',
        status: '',
        type: '',
        createdAt: null,
        updatedAt: null
      }
    };
  }
  
  render() {
    let contract = {
      id: 0,
      title: '',
      payeeId: 0,
      payerId: 0,
      description: '',
      totalAmount: 0,
      remainingAmount: 0,
      numberOfPayments: 0,
      paymentFrequency: '',
      dueDate: '',
      acceptedDate: '',
      status: ''
    };
    let counterparty = {
      id: 0,
      username: 'UnknownUser',
      firstName: '',
      lastName: '',
      type: ''
    };
    
    let {amount, dueDate, status, type} = this.props.payment;
    // let {contract} = this.props.contract;
    let paymentDirection = 'Unknown';

    if (this.props.contract) {
      contract = this.props.contract;
    }
    
    if (this.props.counterparty) {
      counterparty= this.props.counterparty;
    }
    
    if (counterparty.id !== 0) {
      if (counterparty.id === contract.payeeId) {
        paymentDirection = 'Pay to';
      }
      else if (counterparty.id === contract.payerId) {
        paymentDirection = 'Receive from';
      }
    }
    
    return (
      <div className={`${type}`}>
        <p className="amount">{+amount/100}</p>
        <p className="dueDate">{dueDate}</p>
        <p className="status">{status}</p>
        <p className="direction">{paymentDirection}</p>
      </div>
    );
  }
}