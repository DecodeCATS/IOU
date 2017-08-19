import React, {Component} from 'react';

import './ContractHistoryCard.css';

export default class ContractHistoryCard extends Component {
  render() {
    return (
      <div >
        <div className="history">
          <h3>Current version of the contract ID: {this.props.contract.id}
          <br/>
              Initial Contract ID: {this.props.contract.parentId}
          </h3>
        </div>
        <div className="parent">
            <h3></h3>
        </div>
      </div>
    );
  }
}