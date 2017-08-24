import React, {Component} from 'react';
import {connect} from 'react-redux';

import './PaymentCard.css';
import * as Payments from '../../actions/paymentActions';

class PaymentCard extends Component {
    constructor(props) {
        super(props);

        this.defaultProps = {

            // Payment object expected
            payment: {
                id: 0,
                contractId: 0,
                currencyId: 0,
                amount: 0,
                dueDate: '',
                paymentDate: '',
                status: '',
                type: '',
                createdAt: null,
                updatedAt: null
            }
        };
        
        this.completePayment = this.completePayment.bind(this);
    }
    
    completePayment(e) {
        e.preventDefault();
        this.props.dispatch(Payments.completePayment(this.props.payment));
    }

    render() {
        let contract = {
            id: 0,
            title: '',
            payeeId: 0,
            payerId: 0,
            description: '',
            totalAmount: 0,
            remainingAmount: 0,
            numberOfPayments: 0,
            paymentFrequency: '',
            dueDate: '',
            acceptedDate: '',
            status: ''
        };
        let counterparty = {
            id: 0,
            username: 'UnknownUser',
            firstName: '',
            lastName: '',
            type: ''
        };

        let {amount, dueDate, status, type} = this.props.payment;
        // let {contract} = this.props.contract;
        let paymentDirection = 'Unknown';
        let buttonToPay = false;

        if (this.props.contract) {
            contract = this.props.contract;

        }

        if (this.props.counterparty) {
            counterparty = this.props.counterparty;

        }

        if (counterparty.id !== 0) {
            if (counterparty.id === contract.payerId) {
                paymentDirection = 'Pay to';
                buttonToPay = true;
            }
            else if (counterparty.id === contract.payeeId) {
                paymentDirection = 'Receive from';
            }
        }
        
        let pDueDate = dueDate.toString().substr(0,dueDate.indexOf('T'));

        //Disable the button for the list of payments, enable it only for payment details
        if (!this.props.button) {
            buttonToPay = false;
        }
        
        return (
            <div className={`payment ${type} ${status==="active" ? (paymentDirection==="Pay to" ? "inputBad" : "inputGood") : null}`}>
                <p className="amount">{+amount / 100}$</p>
                <p className="dueDate">{pDueDate}</p>
                <p className="status">{status}</p>
                <p className="direction">{paymentDirection} {counterparty.username}</p>
                {buttonToPay === true ? <button onClick={this.completePayment}>Pay</button> : null}
            </div>
        );
    }
}

export default connect(state => ({ 
}))(PaymentCard);