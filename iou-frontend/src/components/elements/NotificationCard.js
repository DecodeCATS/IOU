import React, {Component} from 'react';

import './NotificationCard.css';

let defaultSender = {
  id: 0,
  username: '',
  firstName: '',
  lastName: '',
  type: ''
};
      
export default class NotificationCard extends Component {
  constructor(props){
    super(props);
    
    this.defaultProps = {
      // Notification object expected
      notification: {
        id: 0,
        message: '',
        objectId: 0,
        objectType: '',
        senderId: 0,
        createdAt: null,
        updatedAt: null
      }
    };
  }
  render() {
    // console.log(`Default Sender=${JSON.stringify(defaultSender)}`);
    // Check if my parent sent me a valid sender
    if (this.props.sender) {
      defaultSender= this.props.sender;
    }
    return (
      <div className={`${this.props.notification.objectType}`}>
        <h2>{this.props.notification.message}</h2>
        <p>From: {defaultSender.username}</p>
        <p>On: {this.props.notification.createdAt}</p>
      </div>
    );
  }
}