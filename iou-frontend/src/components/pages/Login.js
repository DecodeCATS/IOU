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
            error: '',
            email:'',
            password: ''
        };
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
    }

    handleLogin = () => {
        // deep destructuring equivalent to (let email = this.refs.email.value;)
        let {email: {value: email}, password: {value: password}} = this.refs;
        if (this.props.user.isLoggedIn) {
            this.setState({error: "You're already logged in!"});
            // this.props.history.push('/');
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
    
    handleEmailInput(e) {
        if (e.target.value !== this.state.email) {
            this.setState({
                email: e.target.value
            });
        }
    }
    
    handlePasswordInput(e) {
        if (e.target.value !== this.state.password) {
            this.setState({
                password: e.target.value
            });
        }
    }

    render() {
        let {email, password} = this.state;
        let error="";
        if (this.props.user.error) {
            error=this.props.error;
        }
        
        return (
            <div className="loginContainer">
                <div className="loginItem email">
                    <p>Email</p>
                    <input type="text" ref="email" placeholder="purr@decode.cats"
                       className={`${email.length > 0 ? "inputGood":"inputBad"}`}
                       onInput={this.handleEmailInput}
                       value={email}
                    />
                </div>
                <div className="loginItem password">
                    <p>Password</p>
                    <input type="password" ref="password" className={`${password.length > 0 ? "inputGood":"inputBad"}`}
                        onInput={this.handlePasswordInput}
                        value={password}
                    />
                </div>
                <div className="loginItem button">
                    <button disabled={!email || !password} onClick={this.handleLogin}>login</button>
                </div>
                <h2 className="error">{error}</h2>
            </div>
        );
    }

}

export default connect(state => ({ user: state.user }))(Login);