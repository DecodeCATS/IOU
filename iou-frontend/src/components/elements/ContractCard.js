import React, {Component} from 'react';

import './PaymentCard.css';

export default class ContractCard extends Component {
  render(){
    let {contract} = this.props;
    return (
      <div className="contract">
        <div className="title">
          <p>{contract.title}</p>
        </div>
        <div className="counterparty">
        </div>
      </div>
    );
  }
}