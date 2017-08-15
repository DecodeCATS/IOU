import React, {Component} from 'react';
import api from '../../api';
import auth from '../../auth';
import './Home.css';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  componentDidMount() {
    // this._fetchBoards();
  }
  
  // _fetchBoards = () => {
  //   api.getBoardsList()
  //   .then(res => {
  //     // this.setState({ boards: res.body.boards })
  //   })
  //   .catch(console.error);
  // }

  render() {
    // let { boards } = this.state
    return (
      <div className="home">

      </div>
    );
  }

}
