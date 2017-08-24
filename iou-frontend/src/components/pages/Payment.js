import React, {Component} from 'react';
// import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
// import * as Contracts from '../../actions/contractActions';
// import * as Payments from '../../actions/paymentActions';


import PaymentCard from '../elements/PaymentCard';
// Styling
import './Payment.css';

// This is a smart component. It is aware of the store
class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailedPaymentId: 0,
            detailedPayment: []
        };
        this.renderPaymentCard = this.renderPaymentCard.bind(this);
        this.processPayementDetail = this.processPayementDetail.bind(this);
        this.numberOfContracts = this.numberOfContracts.bind(this);
        this.totalAmountReceived = this.totalAmountReceived.bind(this);
        this.totalAmountPaid = this.totalAmountPaid.bind(this);
    }

    componentWillMount() {
        if (this.props.user.isLoggedIn) {
            // this.props.dispatch(Contracts.fetchContracts());
            // this.props.dispatch(Payments.fetchActivePayments());
        }
    }

    numberOfContracts(){
        let payments = this.props.payments.data;
        let contracts = [];

        payments.forEach(payment => {
            let a = contracts.indexOf(payment.contractId);
            if (a < 0) {
                contracts.push(payment.contractId);
            }
        });

        return contracts.length;
    }

    totalAmountReceived() {
        let userId = this.props.user.data.id;
        let total = 0;

        this.props.payments.data.forEach(payment => {
            this.props.contracts.data.forEach(contract => {
                if (+payment.contractId === +contract.id) {
                    if (userId === contract.payerId) {
                        total += payment.amount;
                    }
                }
            });
        });

        return (total / 100);
    }

    totalAmountPaid() {
        let userId = this.props.user.data.id;
        let total = 0;

        this.props.payments.data.forEach(payment => {
            this.props.contracts.data.forEach(contract => {
                if (+payment.contractId === +contract.id) {
                    if (userId === contract.payeeId) {
                        total += payment.amount;
                    }
                }
            });
        });

        return (total / 100);
    }

    processPayementDetail(paymentId) {
        //Steps 1: get the data for the specific data from the contracts array
        // console.log(paymentId, "what is payement id");

        let selectedPayment = this.props.payments.data.filter(payments => {
            // console.log(payments.paymentId, paymentId, "the filter");
            return payments.paymentId === paymentId;
        });
        // console.log(selectedPayment, "the selected contract array");
        this.setState({detailedPayment: selectedPayment});
    }
    

    renderPaymentCard(payment, button) {
        let contracts = this.props.contracts.data.filter(contract => {
            // console.log(`Contract = ${JSON.stringify(contract)}`);
            return +payment.contractId === +contract.id;
        });

        let counterparties = this.props.connections.data.filter(user => {
            //console.log(`User = ${JSON.stringify(user)}`);
            let flag = false;
            contracts.forEach(contract => {

                if (+contract.payerId === +user.id) {
                    payment = {...payment, counterpartyDirection: "payer"};
                    flag = true;
                }
                else if (+contract.payeeId === +user.id) {
                    payment = {...payment, counterpartyDirection: "payee"};
                    flag = true;
                }
                // return false;
            });
            return flag;
        });

        // console.log(`Payment=${JSON.stringify(payment)}, contract=${JSON.stringify(contracts)}, counterparty=${JSON.stringify(counterparties)}`);

        // onClick should get a CALLBACK and NOT A FUCNTION, Else you go into infinite loop
        return (
            <div key={payment.paymentId} className="paymentCard"
                 onClick={() => this.processPayementDetail(payment.paymentId)}>
                <PaymentCard
                    button={button}
                    payment={payment}
                    contract={contracts.length > 0 ? contracts[0] : null}
                    counterparty={counterparties.length > 0 ? counterparties[0] : null}
                />
            </div>
        );
    }

    render() {
        let paymentData = this.props.payments.data;
        // console.log(`PaymentData=${JSON.stringify(paymentData)}`);
        return (
            <div className="paymentContainer">
                <div className="paymentSummary">
                    <h2>Summary</h2>
                    <div className="SummaryCards">
                        <p className="SummaryItem">Total of payments: {this.props.payments.data.length}</p>
                        <p className="SummaryItem">Total amount received: {this.totalAmountReceived()}$</p>
                        <p className="SummaryItem">Total amount paid: {this.totalAmountPaid()}$</p>
                        <p className="SummaryItem">Total of contract: {this.numberOfContracts()}</p>
                    </div>
                </div>
                <div className="paymentCards">
                    <h2>Payments:</h2>
                    {
                        paymentData.map(payment => this.renderPaymentCard(payment, false))
                    }
                </div>
                <div className="paymentDetail">
                    <h2>Payment detail:</h2>
                    {
                        this.state.detailedPayment.map(payment => this.renderPaymentCard(payment, true))
                    }
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    user: state.user,
    connections: state.connections,
    contracts: state.contracts,
    payments: state.payments
}))(Payment);