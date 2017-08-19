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
    let contract = this.props.contracts.data.filter(contract => {
      return payment.contractId === contract.id;
    });
    
    let counterparty = this.props.connections.data.filter(user => {
      if (contract.payerId === user.id) {
        payment = {...payment, counterpartyDirection: "payer"};
        return true;
      }
      else if (contract.payeeId === user.id) {
        payment = {...payment, counterpartyDirection: "payee"};
        return true;
      }
      return false;
    });
    
    console.log(`Payment=${payment.paymentId}, contract=${contract.id}, counterparty=${counterparty.id}`);
    
    return (
      <div key={payment.paymentId} className="paymentCard">
        <PaymentCard
          payment={payment}
          contract={contract.length > 0 ? contract[0]: null}
          counterparty={counterparty.length > 0 ? counterparty[0]: null}
        />
      </div>
    );
  }
  
  render() {
    let paymentData = this.props.payments.data;
    console.log(`PaymentData=${JSON.stringify(paymentData)}`);
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