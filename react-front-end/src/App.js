import React, { Component } from 'react';
import './App.css';
import SideNavCustom from './AppComponents/AppSideBar';
import UploadFile from './AppBusinessLogic/UploadFile';
import { LoginOps } from './AppBusinessLogic/LoginOp';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';


const history = createBrowserHistory();

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
    }

  render() {
    return (
      <div className="App">
            <SideNavCustom />
            <Router history={history}>
            <div>
            <Route path="/login" component={LoginOps}/>
            <Route path="/upload" component={UploadFile}/>
            </div>
            </Router>
      </div>
    );
  }
}


function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
