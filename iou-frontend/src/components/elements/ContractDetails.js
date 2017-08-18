import React, {Component} from 'react';

import './ContractDetails.css';

export default class ContractDetails extends Component {
    render() {
        return (

            <div className="contractDetails">

                    <ol>
                        <li> Contract ID: {this.contract}</li>
                    </ol>


            </div>
        );
    }
}