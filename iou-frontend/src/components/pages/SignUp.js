import React, {Component} from 'react';
// import {browserHistory as history} from 'react-router';
import {connect} from 'react-redux';

// import * as User from '../../actions/userActions';
import auth from '../../auth';
import './SignUp.css';

// const MAX_USERNAME_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 255;

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            description: '',
            isUpdateProfile: false,
            buttonText: 'SignUp'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
        this.handleLastNameInput = this.handleLastNameInput.bind(this);
        this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
    }
    
    componentWillMount() {
        if (this.props.user.isLoggedIn && this.props.user.data.id > 0 && this.state.username !== this.props.user.data.username) {
            this.setState({
                username: this.props.user.data.username,
                email: this.props.user.data.email,
                firstName: this.props.user.data.firstName,
                lastName: this.props.user.data.lastName,
                description: this.props.user.data.description,
                password: '',
                isUpdateProfile: true,
                buttonText: "Update Info"
            });
        }
    }

    handleUsernameInput(e) {
        if (e.target.value !== this.state.username) {
            this.setState({
                username: e.target.value
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

    handleEmailInput(e) {
        if (e.target.value !== this.state.email) {
            this.setState({
                email: e.target.value
            });
        }
    }

    handleFirstNameInput(e) {
        if (e.target.value !== this.state.firstName) {
            this.setState({
                firstName: e.target.value
            });
        }
    }

    handleLastNameInput(e) {
        if (e.target.value !== this.state.lastName) {
            this.setState({
                lastName: e.target.value
            });
        }
    }
    
    handleDescriptionInput(e) {
        if (e.target.value !== this.state.description && e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
            this.setState({
                description: e.target.value
            });
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        if(!this.props.user.isLoggedIn) {
            let {username, password, email, firstName, lastName, description} = this.state;
            if (password.length<8) {
                this.setState({error: "password must be 8 chars or more"});
            }

            if (username && password && email && firstName && lastName) {
                auth.signup(username, email, password, firstName, lastName, description)
                .then(res => this.props.history.push('/login'))
                .catch(err => {
                    let myError = err.toString();
                    this.setState({error: myError})
                    
                });
            }
            else {
                this.setState({error: `Field required: username, password, email, firstName, lastName`});
            }
        }
        else {
            this.setState({error: `You're already logged in!`});
        }
    }

    render() {
        let {username, password, email, firstName, lastName, description, error, isUpdateProfile, buttonText} = this.state;
        
        // let user = {
        //     error: '',
        //     username: '',
        //     password: '',
        //     email: '',
        //     firstName: '',
        //     lastName: '',
        //     description: '',
        //     isUpdateProfile: false,
        //     buttonText: 'SignUp'
        // };
        
        return (
            <div className="signup">
                <h2 className="error">{error}</h2>
                <form className="signupForm" onSubmit={this.handleSubmit}>
                    <div className="signupItem username">
                        <p>UserName:</p>
                        <input ref="username" type="text" placeholder="MyUsername" disabled={isUpdateProfile}
                            className={`${username ? (username.length > 0 ? "inputGood":"inputBad"): "inputBad"}`}
                            onChange={this.handleUsernameInput}
                            value={username}
                        ></input>
                    </div>
                    <div className="signupItem password">
                        <p>Password 8 chars minimum:</p>
                        <input ref="password" type="password" disabled={isUpdateProfile}
                            className={`${password? (password.length > 0 ? "inputGood":"inputBad"):"inputBad"}`}
                            onChange={this.handlePasswordInput}
                            value={password}
                        ></input>
                    </div>
                    <div className="signupItem email">
                        <p>Email:</p>
                        <input ref="email" type="text" placeholder="email@address.com"
                            className={`${email? (email.length > 0 ? "inputGood":"inputBad") : "inputBad"}`}
                            onChange={this.handleEmailInput}
                            value={email}
                        ></input>
                    </div>
                    <div className="signupItem firstName">
                        <p>First Name:</p>
                        <input ref="firstName" type="text"
                            className={`${firstName? (firstName.length > 0 ? "inputGood":"inputBad") : "inputBad"}`}
                            onChange={this.handleFirstNameInput}
                            value={firstName}
                        ></input>
                    </div>
                    <div className="signupItem lastName">
                        <p>Last Name:</p>
                        <input ref="lastName" type="text"
                            className={`${lastName? (lastName.length > 0 ? "inputGood": "inputBad") : "inputBad"}`}
                            onChange={this.handleLastNameInput}
                            value={lastName}
                        ></input>
                    </div>
                    <div className="signupItem description">
                        <p>Description:</p>
                        <textarea ref="description" placeholder="Description optional"
                            onChange={this.handleDescriptionInput}
                            value={description}
                        ></textarea>
                        <p className="limitCounter">{`${description? description.length : 0}/${MAX_DESCRIPTION_LENGTH}`}</p>
                    </div>
                    <div className="signupItem button">
                        <button type="submit" disabled={(!email || !firstName || !lastName) || (isUpdateProfile ? false : (!username || !password))}>{buttonText}</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(state => ({ user: state.user }))(SignUp);