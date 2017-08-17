import React, {Component} from 'react';
// import {withRouter} from 'react-router-dom';
// import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import * as User from '../../actions/userActions';
// import auth from '../../auth';
import './Login.css';

const ENTER = 13;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // status: '',
            error: ''
        };
    }

    _handleLogin = () => {
        // deep destructuring equivalent to (let email = this.refs.email.value;)
        let {email: {value: email}, password: {value: password}} = this.refs;
        if (this.props.user.isLoggedIn) {
            this.setState({error: "You're already logged in!"});
            this.props.history.push('/');
        }
        else if (email && password) {
            this.props.dispatch(User.loginUser(email, password));
            // this.props.history.push('/');
        }
        else {
            this.setState({error: "Please enter an email and password"});
        }
    }

    _handleTyping = (e) => {
        if (this.state && this.state.error) {
            this.setState({error: null});
        }
        if (e.keyCode === ENTER) {
            this._handleLogin();
        }
    }

    render() {
        console.log("TestLogin!");
        return (
            <div className="login">
                <input type="text" ref="email"
                       onKeyUp={this._handleTyping}
                />
                <input type="password" ref="password"
                       onKeyUp={this._handleTyping}
                />
                <button onClick={this._handleLogin}>login</button>
                <h2 className="error">{this.state.error ? this.state.error : this.props.user.status}</h2>
            </div>
        );
    }

}

export default connect(state => ({ user: state.user }))(Login);