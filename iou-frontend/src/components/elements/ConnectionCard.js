import React, {Component} from 'react';

import './ConnectionCard.css';

export default class ConnectionCard extends Component {
  render() {
    return (
      <div className={`${this.props.user.type}`}>
        <div className="username">
          <h2>{this.props.user.username}</h2>
        </div>
        <div className="realName">
          <p>{this.props.user.firstName}</p>
          <p>{this.props.user.lastName}</p>
        </div>
      </div>
    );
  }
}