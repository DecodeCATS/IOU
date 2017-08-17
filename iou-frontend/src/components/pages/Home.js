import React, {Component} from 'react';
import {connect} from 'react-redux';
// import api from '../../api';
// import auth from '../../auth';
import * as Connections from '../../actions/connectionActions';
import * as Contracts from '../../actions/contractActions';
import './Home.css';
// import {browserHistory as history} from 'react-router';

class Home extends Component {
    componentWillMount() {
        if (this.props.user.isLoggedIn) {
            this.props.dispatch(Connections.fetchConnections());
            this.props.dispatch(Contracts.fetchContracts());
        }
    }

    render() {
        // let {boards} = this.state;
        // this.props.contracts
        //console.log(`Rendering=${JSON.stringify(this.state.boards)}`);
        console.log(this.props.connections, this.props.contracts);
        return (
            <div className="home">
                <h1>Home Page!</h1>
                <p>{this.props.location.state}</p>
                <p>Data load status: {this.props.connections.status}</p>
                {/*<p>Data load status: {this.props.contracts.status}</p>*/}
            </div>
        );
    }

}

export default connect(state => ({ user: state.user, connections: state.connections, contracts: state.contracts }))(Home);