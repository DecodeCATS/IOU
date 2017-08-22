import React, {Component} from 'react';
// import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
// import api from '../../api';
// import auth from '../../auth';
// import * as Connections from '../../actions/connectionActions';
// import * as Contracts from '../../actions/contractActions';
import './Home.css';
// import {browserHistory as history} from 'react-router';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activePayments: [],
          dataUpdated: "",
          activeStats: {
              sumPayments: 0,
              sumReception: 0,
              sumTotal: 0
          },
          totalStats: {
              sumPayments: 0,
              sumReception: 0,
              sumTotal: 0
          }
        };
    }
    
    // componentWillMount() {
    //     if (this.props.user.isLoggedIn && this.props.payments && this.props.payments.data) {
    //         // let activePayments = this.props.payments.data.filter(payment => {
    //         //     return payment.status === "active";
    //         // });
    //     }
    // }

    render() {
        return (
            <div className="home">
                <h1>Home Page!</h1>
                <div className="graph">
                </div>
                <div className="notificationSummary">
                </div>
                <div className="connectionSummary">
                </div>
                <div className="contractSummary">
                </div>
                <div className="paymentSummary">
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
}))(Home);