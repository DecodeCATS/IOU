import React, {Component} from 'react';
import {connect} from 'react-redux';
// import * as Contracts from '../../actions/contractActions';
// import { Button, Grid, Col, Alert } from 'react-bootstrap';
// import ReactDOM from 'react-dom'
import ContractCard from '../elements/ContractCard';
import ContractDetailCard from "../elements/ContractDetailCard";
import ContractPaymentCard from "../elements/ContractPaymentCard";
import './ContractV2.css';



class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailedContractId: 0,
      detailedContract: [],
      detailedContractHistory: [],
      detailedContractPayments: []
    };
    this.renderList = this.renderList.bind(this);
    this.onClickContractAction = this.onClickContractAction.bind(this);
    this.onClickContractHistoryAction = this.onClickContractHistoryAction.bind(this);
    this.processContractDetail = this.processContractDetail.bind(this);
    this.processContractHistory = this.processContractHistory.bind(this);
    this.processContractPayments = this.processContractPayments.bind(this);
  }

  //This filters the contracts Array to get the right contract using the passed ContractId

  processContractDetail(contractId){
    // selectedContract is an Array of 1 contract, i.e: the selected contract
    let selectedContract = this.props.contracts.data.filter(contracts => {
      console.log(contracts);
      return contracts.id === contractId;
    });
    //the detailedContract Array in state will be updated to the selectedContract
    // we can later use that in render() by using this.state.detailedContracts
    this.setState({detailedContract: selectedContract})
  }

  processContractHistory(contractId){
    // selectedContract is an Array of 1 contract, i.e: the selected contract

    let selectedContract = this.props.contracts.data.filter(contracts => {
      return (contracts.id === contractId || contracts.parentId === contractId);
    });
    console.log("My selected Contract= ", selectedContract )
    //the detailedContract Array in state will be updated to the selectedContract
    // we can later use that in render() by using this.state.detailedContracts
    this.setState({detailedContractHistory: selectedContract})
  }

  //TODO: Ask where does this.props.payments and other stuff get assigned
  //And are the all data
  processContractPayments(contractId){
    //TODO: Not getting the first payment
    let selectedPayments = this.props.payments.data.filter(payments => {
      console.log("Payments for the contract are =", payments);
      return (payments.contractId === contractId);
    });
    this.setState({detailedContractPayments : selectedPayments});
  }


  onClickContractAction(contractId){
    this.processContractHistory(contractId);
    this.processContractDetail(contractId);
    this.processContractPayments(contractId);
  }


  onClickContractHistoryAction(contractId){
    this.processContractDetail(contractId);
    this.processContractPayments(contractId);
  }

  //Takes an Array of contracts, (which it gets from render() down below)
  renderList(contract){
    //onClick should get a CALLBACK and NOT A FUCNTION, Else you go into infinite loop
    return (
      <div key={contract.id} className="latestCards" onClick={() => this.onClickContractAction(contract.id)}>
        <ContractCard
          contract={contract}
        />
      </div>
    );
  }

  renderContractHistoryData(contract)
  {
    return (
      <div key={contract.id} className="latestCards" onClick={() => this.onClickContractHistoryAction(contract.id)}>
        <ContractCard
          contract={contract}
        />
      </div>
    );
  }

  renderContractPayments(payment){
    return (
      <div key={payment.paymentId} className="latestCards">
        <ContractPaymentCard
          payment={payment}
        />
      </div>
    );
  }

  renderContractDetails(contract) {
    let myId = this.props.user.data.id;
    let counterparties = [];
    let isPayer = true;

    if (contract.payeeId === myId) {
      isPayer = false;
    }

    //this.props.connections comes from the store
    if (this.props.connections.data) {
      counterparties = this.props.connections.data.filter(user => {
        let flag = false;
        if (+contract.payerId === +user.id) {
          flag = true;
        }
        else if (+contract.payeeId === +user.id) {
          flag = true;
        }
        return flag;
      });
    }

    console.log("Counterparty size after users", counterparties.length);
    // If counterparty is still empty, search through organisations
    console.log("payment s=", this.props.payments.data);
    if (counterparties.length < 1 && this.props.organisations.data) {
      counterparties = this.props.organisations.data.filter(user => {
        let flag = false;
        if (+contract.payerId === +user.id) {
          flag = true;
        }
        else if (+contract.payeeId === +user.id) {
          flag = true;
        }
        return flag;
      });
    }

    console.log("Counterparty size after orgs", counterparties.length);
    //{/*contract info from the store after api call*/}

    //onClick should get a CALLBACK and NOT A FUCNTION, Else you go into infinite loop
    return (
      <div key={contract.id} className="latestCards">
        <ContractDetailCard
          contract={contract}
          isPayer={isPayer}
          counterparty={counterparties[0]}
        />
      </div>
    );
  }

  //Missing 1 payment on render
  render() {
    let latestContracts = [];
    if (this.props.contracts.data) {
      //this.props.contracts.data is now sored in the latestContractsArray
      latestContracts = this.props.contracts.data;//.filter(contract => contract.isLatest);
    }
    // console.log("Latest contracts", latestContracts);
    return (
      <div className="pageContainer">
        <div className="listContainer">
          <h2>Contract List</h2>
          <div>
            {
              latestContracts.map(contract => this.renderList(contract))
            }
          </div>
        </div>
        <div className="historyContainer">
          <h2>Contract History</h2>
          {
            this.state.detailedContractHistory.map(contract => this.renderContractHistoryData(contract))
          }
        </div>
        <div className="detailContainer">
          <h2>Contract Details:</h2>
          {
            this.state.detailedContract.map(contract => this.renderContractDetails(contract))
          }
        </div>
        <div className="paymentContainer">
          <h2>Payment Details:</h2>
          {
            this.state.detailedContractPayments.map(payment => this.renderContractPayments(payment))
          }
        </div>
      </div>
    );
  }
}


export default connect(state => ({
  user: state.user,
  connections: state.connections,
  organisations: state.organisations,
  notifications: state.notifications,
  contracts: state.contracts,
  payments: state.payments,
  currencies: state.currencies
}))(Contract);