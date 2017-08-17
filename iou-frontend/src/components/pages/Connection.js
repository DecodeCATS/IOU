import React, {Component} from 'react';
// import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import * as Connections from '../../actions/connectionActions';

import ConnectionCard from '../elements/ConnectionCard';
import './Connection.css';

//This is a smart component. It is aware of the store
class Connection extends Component {
  componentWillMount() {
    if (this.props.user.isLoggedIn) {
      // console.log("Fetching connections");
      
      // Done in App.js
      // this.props.dispatch(Connections.fetchConnections());
    }
  }

  deleteConnection = (connectionUserId) => {
    // console.log(connectionUserId);
    // connectionUserId is provided by the bind's second argument of the button in render
    if (this.props.user.isLoggedIn && connectionUserId) {
      // console.log(`Deleting connection ${connectionUserId}`);
      this.props.dispatch(Connections.deleteConnection(connectionUserId));
    }
  }
  
 render() {
  // console.log(`Connections!!!!!=${JSON.stringify(this.props.connections)}`);
   let {data} = this.props.connections;
    return (
      <div className="connectionContainer">
        <div className="connectionSubContainer">
          <h2>Connections</h2>
          <div className="connectionCards">
            {
              data.map(user =>
                <div key={user.id} className="connectionCard">
                  <ConnectionCard
                    user={user}
                  />
                  <div className="connectionButtons">
                    <button>RequestFunds</button>
                    <button>Mute</button>
                    <button onClick={this.deleteConnection.bind(this,user.id)}>Delete</button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className="connectionSubContainer">
          <h2>Muted Notifications</h2>
          <div className="connectionCards">
          </div>
        </div>
      </div>
    );
 } 
}

export default connect(state => ({ user: state.user, connections: state.connections }))(Connection);