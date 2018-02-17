import React, { Component, Fragment } from 'react';
import ConferencePaperPanel from '../AppComponent/MainSelectionPage.js';
import { getFile } from '../AppUrlConstants.js';
import { connect } from 'react-redux';
import { downloadPaper } from '../Redux/Actions/ActionCreators.js';
import ErrSnackBar from '../AppComponent/LoadingSnackBar.js';

class MainPageSelectionLogic extends Component{
	constructor(props){
		super(props);
		this.state={
			data: props.data,
			tempData: props.data[0],
			expanded: "",
			isLoading: props.shouldLoad,
			search_value:""
		}
	}


	componentWillReceiveProps(nextProp){
		this.setState({isLoading: nextProp.shouldLoad});
	}

	searchfilterfunc(value){
		this.props.data.forEach((paper) =>{
			if (paper.title[0].toLowerCase().indexOf(value.toLowerCase()) != -1){
				 console.log(paper.title)
			}else{
				console.log(paper)
			}
		}
	)
	}

	changesearchvalue = (e)=>{
		this.setState({search_value: e.target.value});
		this.searchfilterfunc(this.state.search_value);
	}

	handlePanelChange = panelToChange => (event, expanded) =>{
		 this.setState({
		      expanded: expanded ? panelToChange : false,
		 });
		 this.state.data.map((elem)=>{
		 	if(elem.title[0] === panelToChange){
		 		this.state.tempData = elem;
		 	}
		 });
	}

	downloadCallBack = ()=>{
		let idToDownload = getFile + "/?pgid=" + this.state.tempData.pgid;
		this.props.downloadPaper(idToDownload, this.state.tempData.title);
	}

	clickOnNodeCallBack = (nodeId, dataToSearch)=>{
		dataToSearch.map((elem)=>{
			if(elem.id === nodeId[0]){
				this.setState({tempData: elem});
			}
		});

		this.state.data.map((elem)=>{
			if(elem.id === nodeId[0]){
				this.setState({tempData: elem})
			}
		})
	}

	filterBySurName = ()=>{
		let surNameArr = [];
	    let shorterTitle = [];
	    this.state.data.map((elem)=>{
	    	if(elem.title[0].split('').length > 5){
	    		shorterTitle.push(elem.title.slice(0,4));
	    	}

	    	if(elem.surname !== undefined){
		    	let surName = elem.surname;
		    	let newSurName = surName[0] + " " + "et al.";
		    	surNameArr.push(newSurName);
		    } else {
		    	let surNamePlaceHolder = "No Surname";
		    	surNameArr.push(surNamePlaceHolder);
		    }
	    });

	    return [surNameArr, shorterTitle];
	}

	render(){
		//const filteredStuff = this.searchfilterfunc();
		const filterSurNames = this.filterBySurName();
		let selectedAuthor = null
		if(this.state.tempData.surname === undefined){
			selectedAuthor = "No surname"
		} else {
			selectedAuthor = this.state.tempData.surname[0] + " " + "et al.";
		}

		return(
			<Fragment>
				<ConferencePaperPanel
					handleChange = {this.handlePanelChange}
					expanded = {this.state.expanded}
					data = {this.state.data}
					filter_fuction = {this.filteredStuff}
					shorterTitleArr = {filterSurNames[1]}
					surNameArray = {filterSurNames[0]}
					downloadPaper = {this.downloadCallBack}
					nodeClick = {this.clickOnNodeCallBack}
					selectedCardNodeTitle = {this.state.tempData.title}
					labelOfSelectedNode = {this.state.tempData.labels[0]}
					surName = {selectedAuthor}
					search_input_value={this.changesearchvalue}
				/>
				{
					this.state.isLoading === true ? <ErrSnackBar
													  open={this.state.isLoading}
													/> : null
				}
			</Fragment>
		)
	}
}

const mapStateToProps = (state)=>{
	const { shouldLoad } = state.ReducerAppState;
	return {
		shouldLoad
	}
}

const mapDispatchToProps = (dispatch)=>{
	return({
		downloadPaper : (paperUrl, title)=>{dispatch(downloadPaper(paperUrl, title))},
	});
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPageSelectionLogic);
