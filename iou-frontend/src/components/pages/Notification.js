import React, {Component} from 'react';
// import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import * as Notifications from '../../actions/notificationActions';

import NotificationCard from '../elements/NotificationCard';
// import ConnectionCard from '../elements/ConnectionCard';
import './Notification.css';

//This is a smart component. It is aware of the store
class Notification extends Component {
  componentWillMount() {
    if (this.props.user.isLoggedIn) {
      console.log("Fetching connections");
      this.props.dispatch(Notifications.fetchNotifications());
    }
  }
  
  deleteNotification = (notificationId) => {
    // console.log(notificationId);
    // notificationId is provided by the bind's second argument of the button in render
    if (this.props.user.isLoggedIn && notificationId) {
      // console.log(`Deleting notification ${notificationId}`);
      this.props.dispatch(Notifications.deleteNotification(notificationId));
    }
  }
  
  render() {
    // console.log(`Notifications!!!!!=${JSON.stringify(this.props.notifications)}`);
    let {data} = this.props.notifications;
    return (
      <div className="notificationContainer">
        <div className="notificationSubContainer">
          <h2>Notifications</h2>
          <div className="notificationCards">
            {
              data.map(notification =>
                <div key={notification.id} className="notificationCard">
                  <NotificationCard
                    notification={notification}
                  />
                  <button onClick={this.deleteNotification.bind(this,notification.id)}>Delete</button>
                </div>
              )
            }
          </div>
        </div>
        <div className="blacklistSubContainer">
          <h2>Muted Connections</h2>
          <div className="notificationCards">
            <div className="notificationCard">
            </div>
          </div>
        </div>
      </div>
    );
  } 
}

export default connect(state => ({ user: state.user, notifications: state.notifications }))(Notification);