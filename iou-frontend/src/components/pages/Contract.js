import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Contracts from '../../actions/contractActions';
import ContractCard from '../elements/ContractCard';
import ContractDetails from '../elements/ContractDetails';
import './Contract.css';

class Contract extends Component {
    componentWillMount() {
        //console.log("Fetching contracts");
        this.props.dispatch(Contracts.fetchContracts());
    }

    render() {
        // console.log(`Contracts to output!=${JSON.stringify(this.props.contracts)}`);
        let {data} = this.props.contracts;
        console.log(data);
        return (
            <div>
                <div className="contractContainer">
                    <div className="contractSubContainer">
                        <h2>Contract's history</h2>
                        {
                            data.map(contract =>
                                <div key={contract.id} className="contractCard">
                                    <ContractCard contract={contract}/>

                                </div>
                            )
                        }
                    </div>
                    <div className="contractSubContainer">
                        <h2>Contract's details</h2>
                        {
                            data.map(contract =>
                                <div key={contract.id} className="contractDetails">
                                    <ContractDetails contract={contract.id}/>

                                </div>
                            )
                        }
                    </div>
                    <div className="contractSubContainer">
                        <h2>Payment's details</h2>
                        {
                            data.map(contract =>
                                <div key={contract.id} className="contractCard">
                                    <ContractCard contract={contract}/>

                                </div>
                            )
                        }
                    </div>
                </div>
                <div>
                <button>TRANSFER CONTRACT</button>
                <button>PAY OFF CONTRACT </button>
                <button>BACK TO THE LIST OF CONTRACTS</button>
                </div>
            </div>

        );
    }
}

export default connect(state => ({contracts: state.contracts}))(Contract);