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
                    <input ref="username" type="text"></input>
                    <input ref="password" type="password"></input>
                    <input ref="email" type="text"></input>
                    <input ref="firstName" type="text"></input>
                    <input ref="lastName" type="text"></input>
                    <input ref="avatarUrl" type="text"></input>
                    <textarea ref="description"></textarea>
                    
                    <button>SignUp</button>
                </form>
            </div>
        );
    }
}
