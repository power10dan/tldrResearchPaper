import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DashBoardControlHOC from './AppComponent/DashBoardLogic.js';
import { withStyles } from 'material-ui/styles';
import { styles, CustomizationList } from './AppComponent/CustomizationAction.js';
import GetContentFromServer from './AppBusinessLogic/PaperDownloadLogic.js';
import { DataSubscriptionDummyFunc } from './DummyData.js';
import SignUp from './AppComponent/SignUp.js';
import LogIn from './AppComponent/LogIn.js';

class App extends Component {

  componentWillReceiveProps(nextProp){
    this.setState({currPage: nextProp.CurrPage});
  }

  render() {
  	let DownloadedContent = GetContentFromServer(CustomizationList, DataSubscriptionDummyFunc);
	  let StyledCustomizationComponent = withStyles(styles)(DownloadedContent);
    //if(this.state.currPage === "")
    let CustomPage = DashBoardControlHOC(LogIn);
    return (
      <div className="App">
          <CustomPage />
      </div>
    );
  }
}

export default App;
