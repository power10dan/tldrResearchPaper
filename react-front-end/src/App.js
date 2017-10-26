import React, { Component } from 'react';
import './App.css';
import SideNavCustom from './AppComponents/AppSideBar.js';
import UploadFile from './AppBusinessLogic/UploadFile.js';
import LoginOperations from './AppBusinessLogic/LoginOp.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SideNavCustom />
        <UploadFile />
        <LoginOperations />
      </div>
    );
  }
}

export default App;
