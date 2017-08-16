import React from 'react';
import ReactDOM from 'react-dom';
import { /*Router, Route,*/ BrowserRouter } from 'react-router-dom';
import App from './components/App';
// import Connection from './components/pages/Connection';
// import Contract from './components/pages/Contract';
// import Notification from './components/pages/Notification';
// import Home from './components/pages/Home';
// import Login from './components/pages/Login';
// import SignUp from './components/pages/SignUp';

import './index.css';
// import registerServiceWorker from './registerServiceWorker';

// const routes = (
//     <Router history={BrowserRouter}>
//       <Route path="/" component={Home}>
//         <Route path="/connections" component={Connection}/>
//         <Route path="/contracts/:id" component={Contract}/>
//         <Route path="/notifications" component={Notification}/>
//         <Route path="/signup" component={SignUp}/>
//         <Route path="/login" component={Login}/>
//       </Route>
//     </Router>
// );

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root')
);
// registerServiceWorker();
