import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DashBoardControlHOC from './AppComponent/DashBoardLogic.js';
import { withStyles } from 'material-ui/styles';
import { styles, CustomizationList } from './AppComponent/CustomizationAction.js';
import GetContentFromServer from './AppBusinessLogic/PaperDownloadLogic.js';
import { DataSubscriptionDummyFunc } from './DummyData.js';
import { ConferenceExpansionPanel } from './AppComponent/ExpansionPanelConferences.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            CurrPage: 0,
        }
    }

    componentWillReceiveProps(nextProp){
        this.setState({CurrPage: nextProp.currPage});
    }

    render() {
    	let DownloadedContent = GetContentFromServer(CustomizationList, DataSubscriptionDummyFunc);
  	  let StyledCustomizationComponent = withStyles(styles)(DownloadedContent);
      let CustomPage = null;
      if(this.state.CurrPage === 0){
          CustomPage = DashBoardControlHOC(StyledCustomizationComponent);
      } else {
          CustomPage = DashBoardControlHOC(ConferenceExpansionPanel);
      }

      return (
        <div className="App">      
            <CustomPage />
        </div>
      );
    }
}

export default App;
