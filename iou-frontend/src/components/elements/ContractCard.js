import React, {Component} from 'react';

import './ContractCard.css';

export default class ContractCard extends Component {
    //onClick={this.props.click}
  render(){

    let thisCounterparty = {
      id: 0,
      username: ""
    }
    let {contract, counterparty, isPayer} = this.props;
    
    if (counterparty && counterparty.username) {
        thisCounterparty = counterparty;
    }

    return (
      <div className="payment">
        <div className="title">
          <p> {contract.title} </p>
        </div>
        <div className="counterparty">
          <p>{isPayer ? "Pay to" : "Receive from"} {thisCounterparty.username}</p>
        </div>
      </div>
    );
  }
}