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
    
    return (
      <div key={contract.id} className="latestCards">
        <ContractCard contract={contract} />
      </div>
    );
  }
  
  render() {
    let latestContracts = [];
    if (this.props.contracts.data) {
      latestContracts = this.props.contracts.data;//.filter(contract => contract.isLatest);
    }
    console.log("Latest contracts", latestContracts);
    return (
      <div className="pageContainer">
        <div className="listContainer">
          {
            latestContracts.map(contract => this.renderList(contract))
          }
        </div>
        <div className="detailContainer">
        </div>
        <div className="paymentContainer">
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