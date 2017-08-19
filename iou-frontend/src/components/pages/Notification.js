import React, {Component} from 'react';
// import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import * as Notifications from '../../actions/notificationActions';
import * as Connections from '../../actions/connectionActions';

import NotificationCard from '../elements/NotificationCard';
import ConnectionCard from '../elements/ConnectionCard';
import './Notification.css';

//This is a smart component. It is aware of the store
class Notification extends Component {
  componentWillMount() {
    if (this.props.user.isLoggedIn) {
      // Done in App.js
      // this.props.dispatch(Notifications.fetchNotifications());
      // if (this.props.connections.data.length === 0) {
      //   this.props.dispatch(Connections.fetchConnections());
      // }
    }
  }
  
  deleteNotification = (notificationId) => {
    // notificationId is provided by the bind's second argument of the button in render
    if (this.props.user.isLoggedIn && notificationId) {
      // console.log(`Deleting notification ${notificationId}`);
      this.props.dispatch(Notifications.deleteNotification(notificationId));
    }
  }
  
  deleteBlacklist = (blacklistUserId) => {
    // notificationId is provided by the bind's second argument of the button in render
    if (this.props.user.isLoggedIn && blacklistUserId) {
      this.props.dispatch(Connections.deleteBlacklist(blacklistUserId));
    }
  }
  
  renderNotificationCard = (notification) => {
    // console.log(`NotificationId=${notification.id} connectionsInfo=${JSON.stringify(this.props.connections.data)}`)
    let sender = this.props.connections.data.filter(user => {
      return notification.senderId === user.id;
    });
    // console.log(`Sender=${JSON.stringify(sender)}`);
    return (
      <div key={notification.id} className="notificationCard">
        <NotificationCard
          notification={notification}
          sender={sender.length > 0 ? sender[0] : null}
        />
        <div className="notificationButtons">
          <button onClick={this.deleteNotification.bind(this, notification.id)}>Delete</button>
        </div>
      </div>
    );
  }
  
  render() {
    // console.log(`Notifications!!!!!=${JSON.stringify(this.props.notifications)}`);
    // console.log(`Connections!!!!!=${JSON.stringify(this.props.connections)}`);
    let {data} = this.props.notifications;
    let {blacklistData} = this.props.connections;
    return (
      <div className="notificationContainer">
        <div className="notificationSubContainer">
          <h2>Notifications</h2>
          <div className="notificationCards">
            {
              data.map(notification => this.renderNotificationCard(notification))
            }
          </div>
        </div>
        <div className="blacklistSubContainer">
          <h2>Muted Connections</h2>
          <div className="notificationCards">
            {
              blacklistData.map(blacklist =>
                <div key={blacklist.id} className="connectionCard">
                  <ConnectionCard
                    user={blacklist}
                  />
                  <div className="connectionButtons">
                    <button onClick={this.deleteBlacklist.bind(this,blacklist.id)}>UnMute</button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  } 
}

export default connect(state => ({ user: state.user, connections: state.connections, notifications: state.notifications }))(Notification);