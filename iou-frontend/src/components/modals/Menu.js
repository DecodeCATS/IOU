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

    // fetchUser() {
    //     auth.getUser()
    //         .then(res => {
    //             //console.log(`Menu user = ${res}`);
    //             this.updateUser(res);
    //         });
    // }

    // updateUser(user) {
    //     if (this.state.id !== user.id) {
    //         this.setState({
    //             id: user.id,
    //             email: user.email,
    //             avatarUrl: user.avatarurl
    //         });
    //     }
    // }

    // componentDidUpdate() {
    //     const isLoggedIn = auth.isLoggedIn();
    //     if (isLoggedIn && this.state.id === 0) {
    //         this.fetchUser();
    //     } else if (!isLoggedIn) {
    //         this.updateUser({
    //             id: 0,
    //             email: '',
    //             avatarUrl: ''
    //         });
    //     }
    // }

    render() {
        let {closeMenu, show} = this.props;
        const { isLoggedIn } = this.props.user;
        // console.log(`User: ${JSON.stringify(this.props.user)}`);
        return (
            <div className={`menu ${show ? "show" : ""}`}>

                <div className="menu__header">
                    <img src={this.props.user.data.avatarUrl} alt="profile-pic" className="menu__avatar"/>
                    {isLoggedIn ? <p className="menu__user">{this.props.user.data.username}</p> : null}
                </div>

                <div className="menu__list">

                    <NavLink exact to="/" className="menu__item" activeClassName="active" onClick={closeMenu}>
                        Home
                    </NavLink>

                    {!isLoggedIn ?
                        <NavLink to="/Login" className="menu__item" activeClassName="active" onClick={closeMenu}>
                            Login
                        </NavLink>
                        : null}

                    {isLoggedIn ?
                        <NavLink to="/Connections" className="menu__item" activeClassName="active" onClick={closeMenu}>
                            Connections
                        </NavLink>
                        : null}

                    {isLoggedIn ?
                        <NavLink to="/Contracts" className="menu__item" activeClassName="active" onClick={closeMenu}>
                            Contracts
                        </NavLink>
                        : null}

                    {isLoggedIn ?
                        <NavLink to="/Notifications" className="menu__item" activeClassName="active" onClick={closeMenu}>
                            Notifications
                        </NavLink>
                        : null}
                        
                    {!isLoggedIn ?
                        <NavLink to="/Signup" className="menu__item" activeClassName="active" onClick={closeMenu}>
                            Signup
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
