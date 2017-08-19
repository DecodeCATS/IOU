import React, {Component} from 'react';
import ContractHistoryCard from '../elements/ContractHistoryCard';
import ContractDescriptionCard from '../elements/ContractDescriptionCard';
import ContractPaymentsCard from '../elements/ContractPaymentsCard';
import './Contract.css';
import {connect} from 'react-redux';

class Contract extends Component {
    render() {
        let {data} = this.props.contracts;
        return (
            <div className="contractContainer">
                <div className="textContainer">
                    <h1>Contract Information Page</h1>
                    <p>Contracts details, history and payments information</p>
                </div>

                <div className="contractSubContainer">
                    <div className="contractRow">
                        <div className="contractColumn">
                            <h3>History of the Contract</h3>
                            <hr/>
                            {
                                data.map(contract =>
                                    <div key={contract.id} className="contractHistoryCard">
                                        <ContractHistoryCard contract={contract}/>
                                    </div>
                                )
                            }
                        </div>
                        <div className="contractColumn">
                            <h3>Details of the Contract</h3>
                            <hr/>
                            {data.map(contract =>
                                <div key={contract.id} className="contractDescriptionCard">
                                    <ContractDescriptionCard contract={contract}/>
                                </div>
                            )}


                        </div>
                        <div className="contractColumn">
                            <h3>Details of the Payments</h3>
                            <hr/>
                            {data.map(contract =>
                                <div key={contract.id} className="contractPaymentsCard">
                                    <ContractPaymentsCard contract={contract}/>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                <div className="contractButtons">
                    <button>Transfer Contract</button>
                    <button>Pay Off Contract</button>
                    <button >Back to the list of Contracts</button>
                </div>
            </div>
        );
    }
}

export default connect(state => ({contract: state.contract, contracts: state.contracts}))(Contract);