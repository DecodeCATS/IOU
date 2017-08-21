import React, {Component} from 'react';
import {connect} from 'react-redux';
// import * as Contracts from '../../actions/contractActions';
// import { Button, Grid, Col, Alert } from 'react-bootstrap';
// import ReactDOM from 'react-dom'
import ContractCard from '../elements/ContractCard';
import './ContractV2.css';


class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailedContractId: 0
    };
    this.renderList = this.renderList.bind(this);
  }
  
  renderList(contract){
    
    let myId = this.props.user.data.id;
    let counterparties = [];
    let isPayer = true;
    
    if (contract.payeeId === myId) {
      isPayer = false;
    }
    
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
    
    // console.log("Counterparty size after users", counterparties.length);
    // If counterparty is still empty, search through organisations
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
    // console.log("Counterparty size after orgs", counterparties.length);
    return (
      <div key={contract.id} className="latestCards">
        <ContractCard
          contract={contract}
          isPayer={isPayer}
          counterparty={counterparties[0]}
        />
      </div>
    );
  }
  
  render() {
    let latestContracts = [];
    if (this.props.contracts.data) {
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
        <div className="detailContainer">
          <h2>Contract detail:</h2>
        </div>
        <div className="paymentContainer">
          <h2>Payment detail:</h2>
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