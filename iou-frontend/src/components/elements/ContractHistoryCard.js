import React, {Component} from 'react';

import './ContractHistoryCard.css';

export default class ContractHistoryCard extends Component {
  render() {
    return (
      <div >
        <div className="contract">
          <h3>Current version of the contract: {this.props.contract.id}</h3>
        </div>
        <div className="parent">
            <h3>Initial Contract ID: {this.props.contract.parentId}</h3>
        </div>
      </div>
    );
  }
}