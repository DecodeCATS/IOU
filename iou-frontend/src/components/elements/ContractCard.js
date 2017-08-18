import React, {Component} from 'react';

import './ContractCard.css';

export default class ContractCard extends Component {
    render() {
        return (

            <div className="history">

                    <ol>
                        <li> Contract ID: {this.props.contract.id}</li>
                        <li> Title of the contract: {this.props.contract.title}</li>
                        <li> Last updated at: {this.props.contract.updatedAt}</li>
                    </ol>


            </div>
        );
    }
}