import React from 'react';
import './App.css';
import {UploadFile} from './AppBusinessLogic/UploadFile';
import { LoginOps } from './AppBusinessLogic/LoginOp';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <div className="App">
            <Router history={history}>
                <div>
                    <Route path="/" component={LoginOps}/>
                    <Route path="/" component={UploadFile}/> 
                </div>
            </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert,
    };
}


const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
