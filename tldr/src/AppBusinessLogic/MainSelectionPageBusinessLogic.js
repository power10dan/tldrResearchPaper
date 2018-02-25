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
			shouldOpen: true,
			defaultHeader : "Papers Currently In The Database.",
			searchedItem: "",
			searchResult: "",
			recommends: "",
			error_message: props.papersNotFound
		}
	}

	componentWillReceiveProps(nextProp){
		this.setState({isLoading: nextProp.shouldLoad});
		this.setState({searchResult: nextProp.cachedSearchedPaper})
		this.setState({recommends: nextProp.cachedRecommendedPaper})
		this.setState({error_message: nextProp.papersNotFound})
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

	setOnClose = ()=>{
		this.setState({shouldOpen: false})
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
		let errState = null

		if(this.state.tempData.surname === undefined){
			selectedAuthor = "No surname"
		} else {
			selectedAuthor = this.state.tempData.surname[0].concat(" ", "et al.");
		}

		if(this.state.searchResult === undefined || this.state.searchResult === undefined){
			errState =  <ErrSnackBar 
							 open={this.state.shouldOpen} 
							 messageStatus={this.state.error_message}
							 onClose = {this.setOnClose}
						/> 
		} 
		return(
			<Fragment>
				 <SearchBar 
				 	onClickCallBack = {this.searchButtonCallBack}
				 	textInput={this.textFieldOnChange}
				 />
				 { errState}
				 {

				 	Object.keys(this.state.recommends).length > 0 ? <SearchRecView
														searchResult = {this.state.searchResult}
														searchRecommended = {this.state.recommends}
													 /> : null


				 }
	
			</Fragment>
		)
	}
}

const mapStateToProps = (state)=>{
	const { shouldLoad, papersNotFound } = state.ReducerAppState;
	const { cachedSearchedPaper, cachedRecommendedPaper } = state.ReducerPapers;
	return {
		shouldLoad,
		cachedSearchedPaper,
		cachedRecommendedPaper,
		papersNotFound
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