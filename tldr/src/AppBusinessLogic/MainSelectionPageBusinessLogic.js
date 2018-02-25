import React, { Component, Fragment } from 'react';
import ConferencePaperPanel from '../AppComponent/MainSelectionPage.js';
import { getFile, searchFile, getRecommendation } from '../AppUrlConstants.js';
import { connect } from 'react-redux';
import { downloadPaper, GetSearchedPaper, GetRecommendation } from '../Redux/Actions/ActionCreators.js';
import ErrSnackBar from '../AppComponent/LoadingSnackBar.js';
import SearchBar from '../AppComponent/SearchBar.js';
import SearchRecView from '../AppComponent/SearchRecommendView.js';


class MainPageSelectionLogic extends Component{
	constructor(props){
		super(props);
		this.state={
			data: props.data,
			tempData: props.data[0],
			expanded: "",
			isLoading: props.shouldLoad,
			defaultHeader : "Papers Currently In The Database.",
			searchedItem: "",
			searchResult: "",
			recommends: ""
		}
	}

	componentWillReceiveProps(nextProp){
		this.setState({isLoading: nextProp.shouldLoad});
		this.setState({searchResult: nextProp.cachedSearchedPaper})
		this.setState({recommends: nextProp.cachedRecommendedPaper})
	}

	textFieldOnChange = (event) => {
		this.setState({searchedItem: event.target.value})
	}

	searchButtonCallBack = ()=>{
		let searchUrl = searchFile + "/?search_query=" + this.state.searchedItem;
		this.props.searchForPaper(searchUrl);
	}

	handlePanelChange = panelToChange => (event, expanded) =>{
		 this.setState({
		      expanded: expanded ? panelToChange : false,
		 });
		 this.state.data.forEach((elem)=>{
		 	if(elem.title[0] === panelToChange){
		 		this.setState({tempData:elem});
		 	}
		 });
	}

	downloadCallBack = ()=>{
		let idToDownload = getFile + "/?pgid=" + this.state.tempData.pgid;
		this.props.downloadPaper(idToDownload, this.state.tempData.title);
	}

	clickOnNodeCallBack = (nodeId, dataToSearch)=>{
		dataToSearch.forEach((elem)=>{
			if(elem.id === nodeId[0]){
				this.setState({tempData: elem});
			}
		});

		this.state.data.forEach((elem)=>{
			if(elem.id === nodeId[0]){
				this.setState({tempData: elem})
			}
		});
	}

	filterBySurName = ()=>{
		let surNameArr = [];
	    let shorterTitle = [];
	    this.state.data.forEach((elem)=>{
	    	if(elem.title[0].split('').length > 5){
	    		shorterTitle.push(elem.title.slice(0,4));
	    	}

	    	if(elem.surname !== undefined){
		    	let surName = elem.surname;
		    	let newSurName = surName[0].concat(" ", "et al.");
		    	surNameArr.push(newSurName);
		    } else {
		    	let surNamePlaceHolder = "No Surname";
		    	surNameArr.push(surNamePlaceHolder);
		    }
	    });

	    return [surNameArr, shorterTitle];
	}

	render(){
		const filterSurNames = this.filterBySurName();
		let selectedAuthor = null
		let recState = null
		if(this.state.tempData.surname === undefined){
			selectedAuthor = "No surname"
		} else {
			selectedAuthor = this.state.tempData.surname[0].concat(" ", "et al.");
		}

		return(
			<Fragment>
				 <SearchBar 
				 	onClickCallBack = {this.searchButtonCallBack}
				 	textInput={this.textFieldOnChange}
				 />
				 {
				 	this.state.searchResult !== "" ? <SearchRecView
														searchResult = {this.state.searchResult}
													 /> : null


				 }
	
				{
					this.state.isLoading === true ? <ErrSnackBar 
													  open={this.state.isLoading} 
													  messageStatus={"Uploading File, Please Wait"}
													/> : null
				}
			</Fragment>
		)
	}
}

const mapStateToProps = (state)=>{
	const { shouldLoad } = state.ReducerAppState;
	const { cachedSearchedPaper, cachedRecommendedPaper } = state.ReducerPapers;
	return {
		shouldLoad,
		cachedSearchedPaper,
		cachedRecommendedPaper
	}
}

const mapDispatchToProps = (dispatch)=>{
	return({
		downloadPaper : (paperUrl, title)=>{dispatch(downloadPaper(paperUrl, title))},
		searchForPaper : (url, urlRec)=>{dispatch(GetSearchedPaper(url, urlRec))},
		getPaperRecommendation : (url)=>{dispatch(GetRecommendation(url))}
	});
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPageSelectionLogic);