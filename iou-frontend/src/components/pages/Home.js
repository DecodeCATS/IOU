import React, {Component} from 'react';
// import api from '../../api';
// import auth from '../../auth';
import './Home.css';
// import {browserHistory as history} from 'react-router';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
        };
        this.state = {
        };
    }


    render() {
        // let {boards} = this.state;
        //console.log(`Rendering=${JSON.stringify(this.state.boards)}`);
        return (
            <div className="home">
                <h1>Home Page!</h1>
                <p>{this.props.location.state}</p>
            </div>
        );
    }

}
