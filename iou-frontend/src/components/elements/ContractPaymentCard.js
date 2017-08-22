import React, {Component} from 'react';

import './ContractPaymentCard.css';

export default class ContractPaymentCard extends Component {
  //onClick={this.props.click}
  render(){

    let {payment} = this.props; //now, contract = to this.props.contract
    return (
      <div className="contract-payment">
        <h4>Payment:</h4>
        <p>Amount: {payment.amount} </p>
        <p>Payment Due Date: {payment.dueDate ? payment.dueDate : "IOU"} </p>
        <p>Payment Date: {payment.paidDate ? payment.paidDate : "Payment Pending"} </p>
        <p>Payment Type: {payment.type} </p>
        <p>Contract Status: {payment.status} </p>
      </div>
    );
  }
}