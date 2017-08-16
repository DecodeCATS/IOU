import React, {Component} from 'react';
import {connect} from 'react-redux';
// import api from '../../api';
// import auth from '../../auth';
import * as Connections from '../../actions/connectionActions';
import './Home.css';
// import {browserHistory as history} from 'react-router';

class Home extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
        };
        this.state = {
        };
    }
    
    componentWillMount() {
        this.props.dispatch(Connections.fetchConnections());
    }

    render() {
        // let {boards} = this.state;
        //console.log(`Rendering=${JSON.stringify(this.state.boards)}`);
        console.log(this.props.connections);
        return (
            <div className="home">
                <h1>Home Page!</h1>
                <p>{this.props.location.state}</p>
                <p>{this.props.connections.status}</p>
            </div>
        );
    }

}

export default connect(state => ({ connections: state.connections }))(Home);