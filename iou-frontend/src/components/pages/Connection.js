import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Connections from '../../actions/connectionActions';
import ConnectionCard from '../elements/ConnectionCard';
import './Connection.css';

//This is a smart component. It is aware of the store
class Connection extends Component {
  componentWillMount() {
    //console.log("Fetching connections");
    this.props.dispatch(Connections.fetchConnections());
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
                  <button>Delete</button>
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

export default connect(state => ({ connections: state.connections }))(Connection);