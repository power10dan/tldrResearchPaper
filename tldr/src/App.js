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
import LogIn  from './AppComponent/LogIn.js';
import SignUp from './AppComponent/SignUp.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            CurrPage: 0,
        }
    }

    componentWillReceiveProps(nextProp){
        this.setState({CurrPage: nextProp.CurrPage});
    }

    render() {
      let CustomizationListWithStyle = withStyles(styles)(CustomizationList);
    	let DownloadedContent = GetContentFromServer(CustomizationListWithStyle, DataSubscriptionDummyFunc);
      let ConfPanel = GetContentFromServer(ConferenceExpansionPanel, DataSubscriptionConference);
  	  let StyledCustomizationComponent = withStyles(styles)(DownloadedContent);
      let CustomPage = null;

      if(this.state.CurrPage === 0){
          CustomPage = DashBoardControlHOC(LogIn);
      } else  if (this.state.CurrPage === 1){
          CustomPage = DashBoardControlHOC(ConfPanel);
      } else if(this.state.CurrPage === 2){
        CustomPage = DashBoardControlHOC(SignUp);
      }else if(this.state.CurrPage === 3){
        CustomPage = DashBoardControlHOC(StyledCustomizationComponent);
      } else {
          // dummy pagination.
          CustomPage = DashBoardControlHOC(StyledCustomizationComponent);
      }

      return (
          <div className="App">
              <CustomPage />
          </div>
      );
    }
}

const mapStateToProps = (state)=>{
    const { CurrPage } = state.ReducerAppState;
    return {
        CurrPage
    }
}

let Application = connect(mapStateToProps, null)(App)

export default Application;
