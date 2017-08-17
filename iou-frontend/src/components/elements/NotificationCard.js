import React, {Component} from 'react';

import './NotificationCard.css';

export default class NotificationCard extends Component {
  render() {
    return (
      <div className={`${this.props.notification.objectType}`}>
        <h2>{this.props.notification.message}</h2>
        <p>From {this.props.sender.username}</p>
      </div>
    );
  }
}