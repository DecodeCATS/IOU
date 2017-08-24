import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';
// import auth from '../../auth';
// import {browserHistory as history} from 'react-router';
// import * as User from '../actions/userActions';
import './Menu.css';


class Menu extends Component {

    constructor(props) {
        super(props);
        // this.defaultProps = {
        //     userInfo: {
        //         userId: 0,
        //         email: '',
        //         username: '',
        //         firstName: '',
        //         lastName: '',
        //         avatarUrl: ''
        //     }
        // };
        // this.state = {
        //     userInfo: this.props.userInfo
        // };
        this._handleLogout = this._handleLogout.bind(this);
    }

    handleClickOutside = () => {
        this.props.closeMenu();
    }

    _handleLogout(e) {
        // e.preventDefault();
        // auth.logout();
        //Call the parent function
        this.props.logout();
        //Needed?
        this.props.history.push('/');
        this.props.closeMenu();
        // history.push('/');
    }

    render() {
        let {closeMenu, show, connections, notifications, contracts, payments} = this.props;
        const { isLoggedIn } = this.props.user;
        // console.log(`User: ${JSON.stringify(this.props.user)}`);
        let connectionCount = 0, notificationCount = 0, contractCount=0, paymentCount=0;
        if (connections.data) {
            connectionCount = connections.data.length;
        }
        
        if (notifications.data) {
            notificationCount = notifications.data.length;
        }
        
        if (contracts.data) {
            contracts.data.forEach(contract => {
                if ((contract.parentId === null && contract.status === "active")
                ||(contract.parentId === null && contract.status === "pending")) {
                    contractCount += 1;
                }
            });
        }
        
        if (payments.data) {
            paymentCount = payments.data.length;
        }
        
        return (
            <div className={`menu ${show ? "show" : ""}`}>

                <div className="menu__header">
                    {/*<img src={this.props.user.data.avatarUrl} alt="profile-pic" className="menu__avatar"/>*/}
                    {isLoggedIn ? <p className="menu__user">{this.props.user.data.username}</p> : null}
                    {isLoggedIn ? <p className="menu__user">{this.props.user.data.firstName}, {this.props.user.data.lastName}</p> : null}
                </div>

                <div className="menu__list">

                    <NavLink exact to="/" className="menu__item" activeClassName="active" onClick={closeMenu}>
                        <h2>Home</h2>
                    </NavLink>

                    {!isLoggedIn ?
                        <NavLink to="/login" className="menu__item" activeClassName="active" onClick={closeMenu}>
                            <h2>Login</h2>
                        </NavLink>
                        : null}

                    {isLoggedIn ?
                        <NavLink to="/profile" className="menu__item" activeClassName="active" onClick={closeMenu}>
                            <h2 className="menuItemName">Profile</h2>
                        </NavLink>
                        : null}

                    {isLoggedIn ?
                        <NavLink to="/notifications" className="menu__item" activeClassName="active" onClick={closeMenu}>
                            <h2 className="menuItemName">Notifications</h2>
                            <h2 className="menuItemInfo">{notificationCount}</h2>
                        </NavLink>
                        : null}
                        
                    {isLoggedIn ?
                        <NavLink to="/connections" className="menu__item" activeClassName="active" onClick={closeMenu}>
                            <h2 className="menuItemName">Connections</h2>
                            <h2 className="menuItemInfo">{connectionCount}</h2>
                        </NavLink>
                        : null}

                    {isLoggedIn ?
                        <NavLink to="/contracts" className="menu__item" activeClassName="active" onClick={closeMenu}>
                            <h2 className="menuItemName">Contracts</h2>
                            <h2 className="menuItemInfo">{contractCount}</h2>
                        </NavLink>
                        : null}

                    {isLoggedIn ?
                        <NavLink to="/createcontract" className="menu__item" activeClassName="active" onClick={closeMenu}>
                            <h2 className="menuItemName">Create Contract</h2>
                        </NavLink>
                        : null}

                    {isLoggedIn ?
                        <NavLink to="/payments" className="menu__item" activeClassName="active" onClick={closeMenu}>
                            <h2 className="menuItemName">Payments</h2>
                            <h2 className="menuItemInfo">{paymentCount}</h2>
                        </NavLink>
                        : null}

                    {isLoggedIn ?
                        <NavLink to="/createpayment" className="menu__item" activeClassName="active" onClick={closeMenu}>
                            <h2 className="menuItemName">Create Payment</h2>
                        </NavLink>
                        : null}
                        
                    {!isLoggedIn ?
                        <NavLink to="/signup" className="menu__item" activeClassName="active" onClick={closeMenu}>
                            <h2>Signup</h2>
                        </NavLink>
                        : null}

                    {isLoggedIn ?
                        <button className="menu__item logoutbutton" onClick={this._handleLogout}>Logout</button>
                        : null}

                </div>

            </div>
        );
    }

}

//withRouter is used to be able to history.push from a component that is not on the router list (see Main.js)
export default withRouter(onClickOutside(Menu));
