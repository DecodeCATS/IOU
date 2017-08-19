import React, {Component} from 'react';

import './ContractDescriptionCard.css';

export default class ContractDescription extends Component {
    render() {
        return (
            <div >
                <div className="description">
                    <h3>Description of the contract
                        {this.props.filter(this.props.contract.id)}:
                        <br/>{this.props.filter(this.props.contract.description)}
                    </h3>
                </div>
            </div>
        );
    }
}