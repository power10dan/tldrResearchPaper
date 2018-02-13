import React, { Component } from 'react';
import GraphComp from '../AppComponent/PaperGraph.js';
import { FetchNumberNodes } from '../Redux/Actions/ActionCreators.js';
import { connect } from 'react-redux';
import * as types from '../Redux/Actions/ActionConstants.js'

class GraphControl extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: props.cachedPaperOriginalChildren,
			currPaper: props.currPaper,
			typeOfPaper: props.typeOfPaper,
			children: props.cachedPaperOriginalChildren
		}
	}

	render(){
		if(this.state.typeOfPaper === "Uploaded"){
			return(
				<GraphComp
					rootNode={this.state.currPaper}
					citedNode={this.state.children[this.state.currPaper.title].children}
					typeOfPap={this.state.typeOfPaper}
					clickNodeCallBack={this.props.graphClick}
					papersDatabase = {this.state.children[this.state.currPaper.title].children}

				/>
			) 
		} else { 
			return(
				<GraphComp
					node={this.state.currPaper}
					typeOfPap={this.state.typeOfPaper}
					clickNodeCallBack={this.props.graphClick}
				/>
			) 	
		}
	}
}

const mapStateToProps = (state)=>{
	const { cachedPaperOriginalChildren} = state.ReducerPapers
	
	return {
		cachedPaperOriginalChildren,
	}
}

const mapDispatchToProps = (dispatch)=>{
	return({
		fetchOriginalPapers: (url, paperId, title)=>{dispatch(FetchNumberNodes(url, paperId, title, types.CACHED_PAPER_ORIGINAL_CHILDREN))}
	})
}
export default connect(mapStateToProps, mapDispatchToProps)(GraphControl);