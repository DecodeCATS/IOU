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
            detailedContractId: 0,
            detailedContract: []
        };
        this.renderList = this.renderList.bind(this);
        this.processContractDetail = this.processContractDetail.bind(this);
    }

    renderList(contract) {

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
        {/*my flag*/
        }

        //onClick should get a CALLBACK and NOT A FUCNTION, Else you go into infinite loop
        return (
            <div key={contract.id} className="latestCards" onClick={() => this.processContractDetail(contract.id)}>
                <ContractCard
                    contract={contract}
                    isPayer={isPayer}
                    counterparty={counterparties[0]}/>
            </div>
        );
    }

    processContractDetail(contractId) {
        //Steps 1 get the data for the specific data from the contracts array
        console.log(contractId, "what is contract id")

        //console.log(this.props.contracts.data);

        let selectedContract = this.props.contracts.data.filter(contracts => {
            console.log(contracts.id, contractId, "the filter")
            return contracts.id === contractId;
        });
        console.log(selectedContract, "the selected contract array")
        this.setState({detailedContract: selectedContract})
    }

    render() {
        let latestContracts = [];
        let selectedContractData = [];
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
                <div className="detailContainer">
                    <h2>Contract detail:</h2>
                    {
                        this.state.detailedContract.map(contract => this.renderList(contract))
                    }
                </div>
                <div className="paymentContainer">
                    <h2>Payment detail:</h2>
                </div>
            </div>
        );
    }
}

//
// {
//     this.state.detailedContract.map(contract=> this.renderList(contract))
// }

export default connect(state => ({
    user: state.user,
    connections: state.connections,
    organisations: state.organisations,
    notifications: state.notifications,
    contracts: state.contracts,
    payments: state.payments,
    currencies: state.currencies
}))(Contract);