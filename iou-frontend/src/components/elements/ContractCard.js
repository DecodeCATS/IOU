import React, {Component} from 'react';

import './ContractCard.css';

export default class ContractCard extends Component {
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
      <div className="contract">
        <div className="title">
          <p>{contract.title}</p>
        </div>
        <div className="counterparty">
          <p>{isPayer ? "Pay to" : "Receive from"} {thisCounterparty.username}</p>
        </div>
      </div>
    );
  }
}