import React, {Component} from 'react';

import './ContractPaymentsCard.css';

export default class ContractPaymentsCard extends Component {
    render() {
        return (
            <div >
                <div className="description">
                    <h3>Payments of the contract
                        {this.props.contract.id}:
                        <br/> Total amount: {this.props.contract.totalAmount}
                        <br/> Remaining amount: {this.props.contract.remainingAmount}
                    </h3>
                </div>
            </div>
        );
    }
}