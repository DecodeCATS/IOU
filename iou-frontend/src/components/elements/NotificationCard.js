import React, {Component} from 'react';

import './NotificationCard.css';
      
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
    let sender = {
      id: 0,
      username: 'UnknownUser',
      firstName: '',
      lastName: '',
      type: ''
    };
    
    if (this.props.sender) {
      sender= this.props.sender;
    }
    
    return (
      <div className={`${this.props.notification.objectType}`}>
        <h2>{this.props.notification.message}</h2>
        <div>
          <h3 className={sender.username==='UnknownUser' ? 'unknown': null}>From: {sender.username}</h3>
          <p className='timestamp'>On: {this.props.notification.createdAt.toLocaleString()}</p>
        </div>
      </div>
    );
  }
}