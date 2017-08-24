import React, {Component} from 'react';

import './ContractPaymentCard.css';

export default class ContractPaymentCard extends Component {
  //onClick={this.props.click}
  render(){

    let {payment} = this.props; //now, contract = to this.props.contract
    
    let dueDate = payment.dueDate.toString().substr(0, payment.dueDate.indexOf('T'));
    let paidDate = payment.paidDate.toString().substr(0, payment.paidDate.indexOf('T'));
    
    return (
      <div className="contract-payment">
        <h4>Payment:</h4>
        <p>Amount: {payment.amount} </p>
        <p>Payment Due Date: {dueDate ? dueDate : "IOU"} </p>
        <p>Payment Date: {paidDate ? paidDate : "Payment Pending"} </p>
        <p>Payment Type: {payment.type} </p>
        <p>Contract Status: {payment.status} </p>
      </div>
    );
  }
}