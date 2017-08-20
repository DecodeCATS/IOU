import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as Contracts from '../../actions/contractActions';
import './CreateContract.css';

const MAX_DESCRIPTION_LENGTH = 255;

class CreateContract extends Component {
  constructor(props) {
    super(props);
    // let today = new Date();
    // let month = 
    // let monthStr = 
    // let tomorrowStr = [''+tomorrow.getFullYear(),''+(tomorrow.getMonth()+1),''+(tomorrow.getDate()+1)].join('-');
    this.defaultProps = {
      counterpartyUserName: 0
    };
    
    // let counterpartyUser
    this.state={
      title: "",
      description: "",
      amount: 1000,
      dueDate: "2018-01-01",
      counterpartyUserId: 0,
      userPaySide: "payer"
    };
    
    this.handlePaySide = this.handlePaySide.bind(this);
    this.handleCounterparty = this.handleCounterparty.bind(this);
    this.handleTitleInput = this.handleTitleInput.bind(this);
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
    this.handleAmountInput = this.handleAmountInput.bind(this);
    this.handleDueDateInput = this.handleDueDateInput.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderCounterparty = this.renderCounterparty.bind(this);
  }
  
  handlePaySide(e) {
    if (e.target.value !== this.state.userPaySide) {
      this.setState({
        userPaySide: e.target.value
      });
    }
  }
  
  handleCounterparty(e) {
    if (e.target.value !== this.state.counterpartyUserId) {
      this.setState({
        counterpartyUserId: e.target.value
      });
    }
  }
  
  handleTitleInput(e) {
    if (e.target.value !== this.state.title) {
      this.setState({
        title: e.target.value
      });
    }
  }
  
  handleDescriptionInput(e) {
      if (e.target.value !== this.state.description && e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
          this.setState({
              description: e.target.value
          });
      }
  }
  
  handleAmountInput(e) {
    if (+e.target.value !== +this.state.amount) {
      this.setState({
        amount: +e.target.value
      });
    }
  }
  
  handleDueDateInput(e) {
    if (e.target.value !== this.state.dueDate) {
      this.setState({
        dueDate: e.target.value
      });
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    // console.log(e);
    console.log(`isLoggedIn=${this.props.user.isLoggedIn} user=${JSON.stringify(this.props.user.data)}`);

    if(this.props.user.isLoggedIn && this.props.user.data.id > 0) {
      let payerId = 0;
      let payeeId = 0;
      if (this.state.userPaySide === "payer") {
        payerId = this.props.user.data.id;
        payeeId = this.state.counterpartyUserId;
      }
      else {
        payerId = this.state.counterpartyUserId;
        payeeId = this.props.user.data.id;
      }
      let createContract = {
        title: this.state.title,
        payerId: payerId,
        payeeId: payeeId,
        description: this.state.description,
        totalAmount: this.state.amount,
        dueDate: this.state.dueDate,
        numberOfPayments: 1,
        paymentFrequency: "one-time"
      };
      console.log("Dispatching");
      console.log(createContract);
      this.props.dispatch(Contracts.addContract(createContract));
    }
  }
  
  renderCounterparty(connection, isOrg=0) {
    // console.log(connection);
    return (
      <option key={connection.id} value={connection.id}>{isOrg? '(ORG)-' : null}{connection.username}</option>
    );
  }
  
  render() {
    let {title, description, amount, dueDate, counterpartyUserId, userPaySide} = this.state;
    return (
      <div>
        <form id="createContractForm" className="contractForm" onSubmit={this.handleSubmit}>
            <div className="selectors">
              <select ref="paymentDirection" value={userPaySide} onChange={this.handlePaySide} required>
                <option value="payer">Payer</option>
                <option value="payee">Payee</option>
              </select>
              <select ref="counterparty" value={counterpartyUserId} onChange={this.handleCounterparty} required>
                {this.props.organisations.data.map(connection => this.renderCounterparty(connection,1))}
                {this.props.connections.data.map(connection => this.renderCounterparty(connection))}
              </select>
            </div>
            <div className="contractItem inputTitle">
              <p>Title:</p>
              <input ref="title" type="text" placeholder="Contract Title"
                  className={`${title.length>0 ? "inputGood":"inputBad"}`}
                  onChange={this.handleTitleInput}
                  value={title}
              ></input>
            </div>
            <div className="contractItem description">
              <p>Description:</p>
              <textarea ref="description" placeholder="Description optional"
                  onChange={this.handleDescriptionInput}
                  value={description}
              ></textarea>
              <p className="limitCounter">{`${description? description.length : 0}/${MAX_DESCRIPTION_LENGTH}`}</p>
            </div>
            <div className="contractItem amount">
              <p>Amount (in cents):</p>
              <input ref="amount" type="number" placeholder={1000}
                  className={`${amount>0 ? "inputGood":"inputBad"}`}
                  onChange={this.handleAmountInput}
                  value={amount}
              ></input>
            </div>
            <div className="contractItem dueDate">
              <p>Due Date:</p>
              <input ref="dueDate" type="date"
                  className={`${dueDate.length>0 ? "inputGood":"inputBad"}`}
                  onChange={this.handleDueDateInput}
                  value={dueDate}
              ></input>
            </div>
            <div className="signupItem button">
                <button type="submit" disabled={(!title || !amount || !dueDate)}>Create Contract</button>
            </div>
        </form>
      </div>
    );
  }
}

export default connect(state => ({ 
  connections: state.connections,
  organisations: state.organisations,
  contracts: state.contracts, 
  payments: state.payments,
  user: state.user
}))(CreateContract);