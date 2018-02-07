import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DashBoardControlHOC from './AppComponent/DashBoardLogic.js';
import { withStyles } from 'material-ui/styles';
import { styles, CustomizationList } from './AppComponent/CustomizationAction.js';
import { style, PapersPanel} from './AppComponent/GraphDisplay.js';
import GetContentFromServer from './AppBusinessLogic/PaperDownloadLogic.js';
import { DataSubscriptionDummyFunc, DataSubscriptionConference } from './DummyData.js';
import  ConferenceExpansionPanel from './AppComponent/ExpansionPanelConferences.js';
import { uploadFile, cachedPaper} from './AppUrlConstants.js';
import { connect } from 'react-redux';
import LogIn  from './AppComponent/LogIn.js';
import SignUp from './AppComponent/SignUp.js';
import ConferencePaperPanel from './AppComponent/MainSelectionPage.js';
import {
        GetChildrenUnionHeader, 
        GetChildrenIntersectionHeader} from './AppBusinessLogic/FileOperations.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            CurrPage: props.CurrPage,
            paperUpload: props.selectedPaper.title,
            idOfPaper: props.selectedPaper.id

        }
    }

    componentWillReceiveProps(nextProp){
        this.setState({CurrPage: nextProp.CurrPage});
        this.setState({paperUpload: nextProp.selectedPaper});
    }

    render() {
      let CustomizationListWithStyle = withStyles(styles)(CustomizationList);
      //let PaperPanels = withStyles(style)(PapersPanel);
      let DownloadedContent = GetContentFromServer( CustomizationListWithStyle,  
                                                    DataSubscriptionDummyFunc());
      let ConfPanel = GetContentFromServer( ConferenceExpansionPanel, 
                                            DataSubscriptionConference());
      //let PapersPanel = GetContentFromServer( ConferenceExpansionPanel, 
       //                                       DataPaperSubscription());

      //slet PaperGraphPanel = GetContentFromServer(PaperPanels, FetchPapers)
  	  let StyledCustomizationComponent = withStyles(styles)(DownloadedContent);
      let ConfPanel = null;
      if(this.state.paperUpload !== ""){
          ConfPanel = GetContentFromServer(ConferencePaperPanel, 
                                           GetChildrenUnionHeader(this.state.idOfPaper, 
                                                                  this.state.paperUpload)
                                           );
      } 

      let CustomPage = null;

      if(this.state.CurrPage === 0){
           CustomPage = DashBoardControlHOC(LogIn, "Login");
      } else if (this.state.CurrPage === 1){
           CustomPage = DashBoardControlHOC(StyledCustomizationComponent, "App Configuration");
      } else if(this.state.CurrPage === 2){
           CustomPage = DashBoardControlHOC(ConfPanel, "Conference Selection");
      } else {
           CustomPage = DashBoardControlHOC(ConferencePaperPanel, "Paper Selection Panel");
           CustomPage = null;
      } 

      return (
          <div className="App">
              <CustomPage />
          </div>
      );
    }
}

const mapStateToProps = (state)=>{
    const { CurrPage, selectedPaper } = state.ReducerAppState;
    return {
        CurrPage,
        selectedPaper
    }
}

let Application = connect(mapStateToProps, null)(App)
export default Application;
