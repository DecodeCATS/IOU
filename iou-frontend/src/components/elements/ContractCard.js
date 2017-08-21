import React, {Component} from 'react';

import './PaymentCard.css';

export default class ContractCard extends Component {
    //onClick={this.props.click}
  render(){

    let {contract} = this.props; //now, contract = to this.props.contract
    return (
      <div className="contract">
        <div className="title">
          <p> {contract.title} </p>
        </div>
        <div className="counterparty">
        </div>
      </div>
    );
  }
}