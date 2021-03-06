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
import LogInControl  from './AppBusinessLogic/LoginBusinessLogic.js';
import MainPageSelectionLogic from './AppBusinessLogic/MainSelectionPageBusinessLogic.js';
import { FetchPapers, FetchNumberNodes} from './Redux/Actions/ActionCreators.js';
import { getNumNodes, getChildrenUnion} from './AppUrlConstants.js';
import * as types from './Redux/Actions/ActionConstants.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            CurrPage: props.CurrPage,
            paperUpload: props.selectedPaper.title,
            idOfPaper: props.selectedPaper.id,
            downloadFinish: false,
            uploadFileArr: [],
            originalFiles: [],
            citedFiles: [],
        }    
    }

    componentWillReceiveProps(nextProp){
        this.setState({CurrPage: nextProp.CurrPage});
        this.setState({paperUpload: nextProp.selectedPaper});
        this.setState({uploadFileArr: nextProp.papersQueried});
    }

    componentDidMount(){
        this.populateRedux();
    }

    populateRedux = () => {
        let defaultPopulateNode = 12; 
        let urlForFetch = getNumNodes + "/"+ "?numNodes=" + defaultPopulateNode;
        this.props.getNumNode(urlForFetch, defaultPopulateNode);
    }

    seperateChildrenByLabel = ()=>{
         let originalFile = [];
         let citedFile = [];
         this.state.uploadFileArr.map((elem)=>{
            if(elem.labels[0] === "Uploaded"){
                originalFile.push(elem);
            } else {
                citedFile.push(elem);
            }
         });

         return [originalFile, citedFile];    
    }
     // fetch all of the children of all of the 
    // original papers. We are passing this as a prop. 
    getChildrenOfOriginalPaper = (originalPapers)=>{
          let originalPaperUrl = getChildrenUnion;
          let paperQuery = getChildrenUnion + "/" + "?id=" + originalPapers.id+ "/";
          this.props.fetchOriginalPapers(paperQuery, originalPapers.id, originalPapers.title, types.CACHED_PAPER_ORIGINAL_CHILDREN);
    }

    render() {
      let arrSeparated = this.seperateChildrenByLabel();
      arrSeparated[0].map((elem)=>{
          this.getChildrenOfOriginalPaper(elem);
      })
      
      let CustomizationListWithStyle = withStyles(styles)(CustomizationList);    
      let DownloadedContent = GetContentFromServer( CustomizationListWithStyle,  
                                                    DataSubscriptionDummyFunc());
    
      let PapersPanel = GetContentFromServer( MainPageSelectionLogic, 
                                              this.state.uploadFileArr);

      let ConfPanel = GetContentFromServer( ConferenceExpansionPanel, 
                                            DataSubscriptionConference());

  	  let StyledCustomizationComponent = withStyles(styles)(DownloadedContent);
      let CustomPage = null;

      if(this.state.CurrPage === 0){
           CustomPage = DashBoardControlHOC(LogInControl, "Login", this.state.CurrPage);
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
        getNumNode: (url, numNode)=>{dispatch(FetchNumberNodes(url, numNode))},
        fetchOriginalPapers: (url, paperId, title)=>{dispatch(FetchPapers(url, paperId, title, types.CACHED_PAPER_ORIGINAL_CHILDREN))}
    });
}

let Application = connect(mapStateToProps, mapDispatchToProps)(App)
export default Application;
