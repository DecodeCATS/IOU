import React, {Component} from 'react';
// import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
// import * as Contracts from '../../actions/contractActions';
// import * as Payments from '../../actions/paymentActions';


import PaymentCard from '../elements/PaymentCard';
// Styling
import './Payment.css';

//This is a smart component. It is aware of the store
class Payment extends Component {
  constructor(props) {
    super(props);
    this.renderPaymentCard = this.renderPaymentCard.bind(this);
  }
  
  componentWillMount() {
    if (this.props.user.isLoggedIn) {
      // this.props.dispatch(Contracts.fetchContracts());
      // this.props.dispatch(Payments.fetchActivePayments());
    }
  }
  
  renderPaymentCard(payment){
    let contracts = this.props.contracts.data.filter(contract => {
      // console.log(`Contract = ${JSON.stringify(contract)}`);
      return +payment.contractId === +contract.id;
    });
    
    let counterparties = this.props.connections.data.filter(user => {
      //console.log(`User = ${JSON.stringify(user)}`);
      let flag = false;
      contracts.forEach(contract => {
        // console.log(`Payer=${contract.payerId}`);
        // console.log(`Payee=${contract.payeeId}`);
        // console.log(`User=${user.id}`);
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
    
    return (
      <div key={payment.paymentId} className="paymentCard">
        <PaymentCard
          payment={payment}
          contract={contracts.length > 0 ? contracts[0]: null}
          counterparty={counterparties.length > 0 ? counterparties[0]: null}
        />
      </div>
    );
  }
  
  render() {
    let paymentData = this.props.payments.data;
    // console.log(`PaymentData=${JSON.stringify(paymentData)}`);
    return (
      <div>Payment Page!
        <div className="paymentCards">
          {
            paymentData.map(payment => this.renderPaymentCard(payment))
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