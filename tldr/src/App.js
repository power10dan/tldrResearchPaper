import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DashBoardControlHOC from './AppComponent/DashBoardLogic.js';
import { withStyles } from 'material-ui/styles';
import { styles, CustomizationList } from './AppComponent/CustomizationAction.js';
import GetContentFromServer from './AppBusinessLogic/PaperDownloadLogic.js';
import { DataSubscriptionDummyFunc, DataSubscriptionConference } from './DummyData.js';
import  ConferenceExpansionPanel from './AppComponent/ExpansionPanelConferences.js';
import { connect } from 'react-redux';

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
      let ConfPanel = GetContentFromServer(ConferenceExpansionPanel, DataSubscriptionConference); 
  	  let StyledCustomizationComponent = withStyles(styles)(DownloadedContent);
      let CustomPage = null;
      
      if(this.state.CurrPage === 0){
          CustomPage = DashBoardControlHOC(StyledCustomizationComponent);
      } else {
          CustomPage = DashBoardControlHOC(ConfPanel);
      }

      return (
      
        <div className="App">      
            <CustomPage />
        </div>

      );
    }
}

const mapStateToProps = (state)=>{
    const { currPage } = state.ReducerAppState.CurrPage;
    return {
        currPage 
    }
}

let Application = connect(mapStateToProps, null)(App)

export default Application;
