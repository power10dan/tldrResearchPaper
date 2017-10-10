import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SideNavCustom from './AppComponents/AppSideBar.js';
import UploadFile from './AppBusinessLogic/UploadFile.js';
import LoginComp from './AppComponents/LoginComp.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SideNavCustom />
        <UploadFile />
        <LoginComp />
      </div>
    );
  }
}

export default App;
