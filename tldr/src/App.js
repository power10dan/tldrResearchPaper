import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DashBoardControlHOC from './AppComponent/DashBoardLogic.js';
import { withStyles } from 'material-ui/styles';
import { styles, CustomizationList } from './AppComponent/CustomizationAction.js';
import GetContentFromServer from './AppBusinessLogic/PaperDownloadLogic.js';
import { DataSubscriptionDummyFunc } from './DummyData.js';

class App extends Component {
  render() {
  	let DownloadedContent = GetContentFromServer(CustomizationList, DataSubscriptionDummyFunc);
	  let StyledCustomizationComponent = withStyles(styles)(DownloadedContent);
    let CustomPage = DashBoardControlHOC(StyledCustomizationComponent);
    return (
      <div className="App">      
          <CustomPage />
      </div>
    );
  }
}

export default App;