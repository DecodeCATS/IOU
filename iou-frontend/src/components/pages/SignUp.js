import React, {Component} from 'react';
// import {browserHistory as history} from 'react-router';
import auth from '../../auth'
import './SignUp.css';


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();

        //console.log("UserName " + this.refs.email.value, "Password " + this.refs.password.value);
        // fetch(`https://private-aa273-dashboardlyfrontend1.apiary-mock.com/auth/users`, {

        let {
            username: {value: username},
            password: {value: password},
            email: {value: email},
            firstName: {value: firstName},
            lastName: {value: lastName},
            avatarUrl: {value: avatarUrl},
            description: {value: description}
        } = this.refs;
        if (username && email && password && firstName && lastName) {
            auth.signup(username, email, password, firstName, lastName, avatarUrl, description)
                .then(res => this.props.history.push('/login'))
                .catch(err => this.setState({error: err.message}));
        }
        else {
            this.setState({error: `Field required: username, password, email, firstName, lastName`});
        }
    }

    render() {
        return (
            <div className="signup">
                <h2 className="error">{this.state.error}</h2>
                <form className="signupForm" onSubmit={this._handleSubmit}>
                    <div className="signupItem username"><p>UserName:</p><input ref="username" type="text"></input></div>
                    <div className="signupItem password"><p>Password:</p><input ref="password" type="password"></input></div>
                    <div className="signupItem email"><p>Email:</p><input ref="email" type="text"></input></div>
                    <div className="signupItem firstName"><p>First Name:</p><input ref="firstName" type="text"></input></div>
                    <div className="signupItem lastName"><p>Last Name:</p><input ref="lastName" type="text"></input></div>
                    <div className="signupItem avatarUrl"><p>Avatar URL:</p><input ref="avatarUrl" type="text"></input></div>
                    <div className="signupItem description"><p>Description:</p><textarea ref="description"></textarea></div>
                    
                    <div className="signupItem button"><button>SignUp</button></div>
                </form>
            </div>
        );
    }
}
