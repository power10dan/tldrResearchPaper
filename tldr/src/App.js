import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DashBoardControlHOC from './AppComponent/DashBoardLogic.js';
import { withStyles } from 'material-ui/styles';
import { styles, CustomizationList } from './AppComponent/CustomizationAction.js';
import GetContentFromServer from './AppBusinessLogic/PaperDownloadLogic.js';
import { DataSubscriptionDummyFunc, DataSubscriptionConference } from './DummyData.js';
import  ConferenceExpansionPanel from './AppComponent/ExpansionPanelConferences.js';
import { uploadFile, cachedPaper} from './AppUrlConstants.js';
import { connect } from 'react-redux';
import LogIn  from './AppComponent/LogIn.js';
import SignUp from './AppComponent/SignUp.js';
import ConferencePaperPanels from './AppComponent/MainSelectionPage.js';
import { FetchPapers, FetchNumberNodes} from './Redux/Actions/ActionCreators.js';
import { getChildrenUnion, getNumNodes} from './AppUrlConstants.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            CurrPage: props.CurrPage,
            paperUpload: props.selectedPaper.title,
            idOfPaper: props.selectedPaper.id,
            downloadFinish: false,
            uploadFileArr: [],
        }    
    }

    componentWillReceiveProps(nextProp){
        this.setState({CurrPage: nextProp.CurrPage});
        this.setState({paperUpload: nextProp.selectedPaper});
        this.setState({uploadFileArr: nextProp.papersQueried});
    }

    componentWillMount(){
        this.populateRedux();
    }

    populateRedux = ()=>{
      let defaultPopulateNode = 3; 
      let urlForFetch = getNumNodes + "/"+ "?numNodes=" + defaultPopulateNode;
      this.props.getNumNode(urlForFetch, defaultPopulateNode);
    }

  
    render() {
      let CustomizationListWithStyle = withStyles(styles)(CustomizationList);
      let DownloadedContent = GetContentFromServer( CustomizationListWithStyle,  
                                                    DataSubscriptionDummyFunc());
      let PapersPanel = GetContentFromServer(
                                              ConferencePaperPanels, 
                                              this.state.uploadFileArr
                                           );
      let ConfPanel = GetContentFromServer( ConferenceExpansionPanel, 
                                            DataSubscriptionConference());

  	  let StyledCustomizationComponent = withStyles(styles)(DownloadedContent);
      
      if(this.state.paperUpload !== ""){
          let urlForFetch = getChildrenUnion + "/" + "?id=" + this.state.paperUpload;
          this.props.getFileChildrenUnion( urlForFetch,  
                                           this.state.idOfPaper, 
                                           this.state.paperUpload);
      } 
    
      let CustomPage = null;

      if(this.state.CurrPage === 0){
           CustomPage = DashBoardControlHOC(LogIn, "Login", this.state.CurrPage);
      } else if (this.state.CurrPage === 1){
           CustomPage = DashBoardControlHOC(StyledCustomizationComponent, "App Configuration", this.state.CurrPage);
      } else if(this.state.CurrPage === 2){
           CustomPage = DashBoardControlHOC(ConfPanel, "Conference Selection", this.state.CurrPage);
      } else {
           CustomPage = DashBoardControlHOC(PapersPanel, "Conference Papers Panel", this.state.CurrPage);
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
    const { papersQueried }  = state.ReducerPapers;
    return {
        CurrPage,
        selectedPaper,
        papersQueried
    }
}

const mapDispatchToProps = (dispatch)=>{
    return({
        getFileChildrenUnion: (urlFetch, idOfPaper, titleOfPaper)=>{dispatch(FetchPapers(urlFetch, idOfPaper, titleOfPaper))},
        getNumNode: (url, numNode)=>{dispatch(FetchNumberNodes(url, numNode))}
    });
}

let Application = connect(mapStateToProps, mapDispatchToProps)(App)
export default Application;
