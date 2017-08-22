import React, {Component} from 'react';

import './ContractDetailCard.css';

export default class ContractDetailCard extends Component {
    render(){

        let {contract} = this.props; //now, contract = to this.props.contract
        let {counterparty} = this.props;
        let {isPayer} = this.props;

        console.log("contract is =",contract);
        console.log("counter party =",counterparty);
        console.log("is Payer =",isPayer);

        return (
            <div className="contract-detail">
                <div className="contract-headers">
                    <h4>Basic Contract Information</h4>
                    <p> Contract: {contract.title} </p>
                    <p> Description: {contract.description} </p>
                    <p> Payer/Payee: {isPayer ? "Payer" : "Payee"} </p>
                    <p> Contract Status: {contract.status} </p>
                    <p> Version: {contract.isLatest ? "Latest Version" : "Outdated Version"} </p>
                </div>
                <div className="contract-amounts">
                    <h4>Monetary Amounts</h4>
                    <p> Total Amount: {contract.total_amount} </p>
                    <p> Remaining Amount: {contract.remainingAmount} </p>
                </div>
                <div className="contract-payment-details">
                    <h4>Payment Details</h4>
                    <p> Expected Payment Frequency: {contract.paymentFrequency} </p>
                    <p> Expected Number of Payments : {contract.numberOfPayments} </p>
                </div>
                <div className="contract-dates">
                    <h4>Important Dates</h4>
                    <p> Date Accepted: {contract.createdAt} </p>
                    <p> Creation Date: {contract.createdAt} </p>
                    <p> Last Update Date: {contract.createdAt} </p>
                </div>
                <div className="counter-party-data">
                    <h4>{isPayer ? "Payee " : "Payer "} Information</h4>
                    <p>Username: {counterparty.username ? counterparty.username : "N/A (This is an open contract)" }</p>
                    <p>Name: {counterparty.firstName} {counterparty.lastName}</p>
                    <p>Type: {counterparty.type} </p>
                    <p>Blacklisted: {counterparty.isBlacklisted ? "Yes" : "No" }</p>
                </div>
            </div>
        );
    }
}