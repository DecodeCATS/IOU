import React, {Component} from 'react';
// import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import * as Connections from '../../actions/connectionActions';

import ConnectionCard from '../elements/ConnectionCard';
import auth from '../../auth';
import './Connection.css';

//This is a smart component. It is aware of the store
class Connection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      username: "",
      firstName: "",
      lastName: "",
      searchResult: [],
      email:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
    this.handleLastNameInput = this.handleLastNameInput.bind(this);
  }
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
  
  
  // deleteBlacklist = (blacklistUserId) => {
  //   if (this.props.user.isLoggedIn && blacklistUserId) {
  //     this.props.dispatch(Connections.deleteBlacklist(blacklistUserId));
  //   }
  // }
  
  addConnection = (connectionUserId) => {
    this.props.dispatch(Connections.addConnection(connectionUserId));
  }
  
  addBlacklist = (blacklistUserId) => {
    this.props.dispatch(Connections.addBlacklist(blacklistUserId));
  }
  
  // =======================================================================
  // *** Event handler for form Info ***
  // =======================================================================
  handleUsernameInput(e) {
    if (e.target.value !== this.state.username) {
        this.setState({
            username: e.target.value
        });
    }
  }
  
  handleFirstNameInput(e) {
      if (e.target.value !== this.state.firstName) {
          this.setState({
              firstName: e.target.value
          });
      }
  }

  handleLastNameInput(e) {
      if (e.target.value !== this.state.lastName) {
          this.setState({
              lastName: e.target.value
          });
      }
  }

  handleEmailInput(e) {
      if (e.target.value !== this.state.email) {
          this.setState({
              email: e.target.value
          });
      }
  }
  
  handleSubmit(e) {
      e.preventDefault();
      if(this.props.user.isLoggedIn) {
          let {username, email, firstName, lastName} = this.state;
          console.log(this.state);
          if (username || email || firstName || lastName) {
              auth.searchConnections(username, email, firstName, lastName)
              .then(res => {
                console.log("Search Result:");
                console.log(res);
                this.setState({searchResult: res.users});
              })
              .catch(err => {this.setState({error: err})});
          }
          else {
              this.setState({error: `Field required: username, password, email, firstName, lastName`});
          }
      }
      else {
          this.setState({error: `You're already logged in!`});
      }
  }

  // =======================================================================
  // *** Render! ***
  // =======================================================================
 render() {
  // console.log(`Connections!!!!!=${JSON.stringify(this.props.connections)}`);
   let {data} = this.props.connections;
  // let {blacklistData} = this.props.connections;
  let {username, firstName, lastName, email} = this.state;
    return (
      <div className="container">
      
        <div className="connectionContainer">
          <h2>Connections</h2>
          <div className="connectionCards">
            {
              data.map(user => {
                return (
                  <div key={user.id} className="connectionCard">
                    <ConnectionCard
                      user={user}
                    />
                    <div className="connectionButtons">
                      <button disabled={true}>Create Contract</button>
                      <button onClick={this.addBlacklist.bind(this,user.id)}>Mute</button>
                      <button onClick={this.deleteConnection.bind(this,user.id)}>Delete</button>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
        
        <div className="searchContainer">
          <h2>Search by username:</h2>
          <div className="searchCards">
            <form className="searchUserForm" onSubmit={this.handleSubmit}>
              <div className="searchItem username">
                  <p>Username:</p>
                  <input ref="username" type="text" placeholder="Username" onChange={this.handleUsernameInput} value={username}></input>
              </div>
              {/*
              <div className="searchItem firstName">
                  <p>First Name:</p>
                  <input ref="firstName" type="text" placeholder="First Name" onChange={this.handleFirstNameInput} value={firstName}></input>
              </div>
              <div className="searchItem lastName">
                  <p>Last Name:</p>
                  <input ref="lastName" type="text" placeholder="Last Name" onChange={this.handleLastNameInput} value={lastName}></input>
              </div>
              <div className="searchItem email">
                  <p>Email Address:</p>
                  <input ref="email" type="text" placeholder="Email Address" onChange={this.handleEmailInput} value={email}></input>
              </div>
              */}
              <div className="searchItem button">
                  <button disabled={(!email && !firstName && !lastName && !username)}>Search!</button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="resultContainer">
          <h2>Search Result:</h2>
          <div className="resultCards">
            {
              this.state.searchResult.map(result => {
                return(
                  <div key={result.id} className="connectionCard">
                    <ConnectionCard
                      user={result}
                    />
                    <div className="resultItem button">
                      <button onClick={this.addConnection.bind(this,result.id)}>Add</button>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>

      </div>
    );
 } 
}

export default connect(state => ({ user: state.user, connections: state.connections }))(Connection);