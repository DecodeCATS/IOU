import React, {Component} from 'react';
// import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { VictoryPie, VictoryChart, VictoryLine, VictoryAxis} from 'victory';

// import api from '../../api';
// import auth from '../../auth';
// import * as Connections from '../../actions/connectionActions';
// import * as Contracts from '../../actions/contractActions';
import './Home.css';
import ContractDetailCard from '../elements/ContractDetailCard2';

// import {browserHistory as history} from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userContracts: [],
      selectContractData: [],
      payerContracts: [],
      payerPayments: [],
      payeeContracts: [],
      payeePayments: [],
      userPayments: [],
      contractsDate: "",
      paymentsDate: ""
    };
    this.processContractDetail = this.processContractDetail.bind(this);
    this.processPayerPayments = this.processPayerPayments.bind(this);
    this.processPayeePayments = this.processPayeePayments.bind(this);
    this.renderPayerPayments = this.renderPayerPayments.bind(this);
    this.renderPayeePayments = this.renderPayeePayments.bind(this);
    this.renderPaymentFlow = this.renderPaymentFlow.bind(this);
  }

  processContractDetail(contractId){
    console.log("processContractDetail was clicked");
    // selectedContract is an Array of 1 contract, i.e: the selected contract
    let selectedContract = this.props.contracts.data.filter(contracts => {
      console.log("Hello inside selectedContract",contracts.id, contractId);
      return contracts.id === contractId;
    });
    //the detailedContract Array in state will be updated to the selectedContract
    // we can later use that in render() by using this.state.detailedContracts
    this.setState({selectContractData: selectedContract})
  }

  //get all the contracts where the user is payer
  processPayerPayments(contracts, payments){
    let myId = this.props.user.data.id;

    let selectedContracts = contracts.filter(contracts => {
      return (contracts.payerId === myId); //only keeps contract where I am the payer
    });
    console.log("selected Contracts=", selectedContracts);

    let selectedPayments = [];
    //console.log("selected payment =", payments);

    selectedContracts.forEach(contract => {
      console.log("parent contract=", contract);
      payments.forEach(payment => {
        if (+contract.id === +payment.contractId) {
          selectedPayments.push(payment);
        }
        // console.log("selected payment =", payment);
        // console.log("contract ids =", +contract.id, +payment.contractId)
        // console.log(+contract.id === +payment.contractId);
        // return (+contract.id === +payment.contractId);
      })
    });

    this.setState({
      payerContracts: selectedContracts,
      payerPayments: selectedPayments,
      contractsDate: this.props.contracts.dataUpdated,
      paymentsDate: this.props.payments.dataUpdated
    })
  }

  processPayeePayments(contracts, payments){
    let myId = this.props.user.data.id;

    let selectedContracts = contracts.filter(contracts => {
      return (contracts.payeeId === myId); //only keeps contract where I am the paye
    });
    console.log("selected Contracts=", selectedContracts);

    let selectedPayments = [];
    //console.log("selected payment =", payments);

    selectedContracts.forEach(contract => {
      console.log("parent contract=", contract);
      payments.forEach(payment => {
        if (+contract.id === +payment.contractId) {
          selectedPayments.push(payment);
        }
      })
    });

    this.setState({
      payeeContracts: selectedContracts,
      payeePayments: selectedPayments,
      contractsDate: this.props.contracts.dataUpdated,
      paymentsDate: this.props.payments.dataUpdated
    })
  }



  componentDidUpdate() {
    console.log("My user data = ", this.props.user.data);
    let latestContracts = []; //ALL latest contracts for user (as both payer and payee)
    let latestPayments = []; //ALL latest payments for user (as both payer and payee)
    if (this.props.contracts.data) {
      latestContracts = this.props.contracts.data;
    }
    if (this.props.payments.data) {
      latestPayments = this.props.payments.data;
    }

    if((this.props.contracts.dataUpdated && this.props.contracts.dataUpdated !== this.state.contractsDate)
      ||(this.props.payments.dataUpdated && this.props.payments.dataUpdated !== this.state.paymentsDate))
    {
      console.log("I am here inside the if");
      this.processPayerPayments(latestContracts, latestPayments);
      this.processPayeePayments(latestContracts, latestPayments);
    }

    if(this.state.selectContractData.length !== 0){
      console.log("It is not null now")
    }
    else{
      console.log("no selected contract")
    }


  }

  renderContractDetails(contract){
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

    return (
      <div key={contract.id} className="latestCards">
        <ContractDetailCard
          contract={contract}
          isPayer={isPayer}
          counterparty={counterparties[0] ? counterparties[0]: {}}
        />
      </div>
    )
  }



  //takes array of all contracts provided in render method
  renderPayerPayments(){
    let data = this.state.payerContracts.map(contract => {
      return {x:contract.id, y: +contract.total_amount}
    });
    console.log("the data",data);
    return(
        <VictoryPie
          colorScale="warm"
          data={data}
          labels = {() => null}
          events={[{
            target: "data",
            eventHandlers: { onClick: (evt, clickedProps) => {
              console.log("the event key =", clickedProps.index);
              console.log("the data inside event key =" , clickedProps.data[clickedProps.index]);
              console.log("my clicked on contract id =", clickedProps.data[clickedProps.index].x);
              let contractId = clickedProps.data[clickedProps.index].x;
              this.processContractDetail(contractId);
            } }
            }]}
        />
    )
  }

  //takes array of all contracts provided in render method
  renderPayeePayments(){
    let data = this.state.payeeContracts.map(contract => {
      return {x:contract.id, y: +contract.total_amount}
    });
    return(
      <VictoryPie
        colorScale="green"
        data={data}
        labels = {() => null}
        events={[{
          target: "data",
          eventHandlers: { onClick: (evt, clickedProps) => {
            console.log("the event key =", clickedProps.index);
            console.log("the data inside event key =" , clickedProps.data[clickedProps.index]);
            console.log("my clicked on contract id =", clickedProps.data[clickedProps.index].x);
            let contractId = clickedProps.data[clickedProps.index].x;
            this.processContractDetail(contractId);
          } }
        }]}
      />
    )
  }

  renderPaymentFlow(){
    //let myId = this.props.user.data.id;
    let paymentsReceived = this.state.payeePayments.map(payment => {
      let dueDateStr = payment.dueDate.toString();
      dueDateStr = dueDateStr.substring(0,dueDateStr.indexOf('T'));

      return {x: dueDateStr, y: +payment.amount/100} //change due date to paid date
    });
    let paymentsMade = this.state.payerPayments.map(payment => {
      let dueDateStr = payment.dueDate.toString();
      dueDateStr = dueDateStr.substring(0,dueDateStr.indexOf('T'));

      return {x: dueDateStr, y: +payment.amount/100}
    });

    console.log("PaymentsReceived=", paymentsReceived);
    console.log("PaymentsMade=", paymentsMade);
    const chartStyle = { parent: {minWidth: "90%", marginLeft: "0%"}};

    return (

      <VictoryChart width={1000} height={400} scale={{x: "time"}} style={chartStyle}>
        <VictoryAxis
          fixLabelOverlap={true}

          style={{
            axis: { stroke: "black", strokeWidth: 2 },
            ticks: { stroke: "transparent"},
            tickLabels: { fill: "black"}
          }}

        />

        <VictoryAxis
          dependentAxis

          style={{
            grid: { strokeWidth: 1 },
            axis: { stroke: "black" },
            ticks: { stroke: "transparent", padding: 15 }
          }}
        />
          <VictoryLine

            style={{
              data: {stroke: "green", strokeWidth: 2},
            }}
            data={paymentsReceived}
          />

          <VictoryLine

            style={{
              data: {stroke: "tomato"},
              axisLabel: {fontSize: 20, padding: 30, angle: 90}
            }}
            data={paymentsMade}
          />

      </VictoryChart>
    )
  }

  render() {

    return (
      <div className="homePageContainer">
        <div className="infoContainer">
          <h1 className="headers">Welcome to IOU</h1>
          <h2>How are you doing today {this.props.user.data.username}? </h2>
          <h3>You can see the visuals for you contracts below</h3>
          <p>You can click on one of the sections of the pie chart to view more info about the contract</p>
        </div>
        <div className="detailContainer">
          <h2>Contract Details</h2>
          {
            this.state.selectContractData.map(contract => this.renderContractDetails(contract))
          }
        </div>
        <div className="visual1Container">
          <h2 className="headers">Showing contracts where you receive money</h2>
          {
            this.renderPayeePayments()
          }
        </div>
        <div className="visual2Container">
          <h2 className="headers">Showing contracts where you own money</h2>
          {
            this.renderPayerPayments()
          }
        </div>
        <div className="visual3Container">
          <h2 className="headers">Showing payment flow</h2>
          {
            this.renderPaymentFlow()
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
  payments: state.payments,
  organisations: state.organisations
}))(Home);