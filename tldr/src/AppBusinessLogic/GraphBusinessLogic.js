import React, { Component } from 'react';
import GraphComp from '../AppComponent/PaperGraph.js';
import { getChildrenUnion } from '../AppUrlConstants.js';
import { FetchNumberNodes } from '../Redux/Actions/ActionCreators.js';
import { connect } from 'react-redux';
import * as types from '../Redux/Actions/ActionConstants.js'

class GraphControl extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: props.data,
			originalPaperChildren: [],
			search_input:""
		}
		if(props.type === "Original"){
			this.getChildrenOfOriginalPaper(props.data)
		}
	}

	search_value_change =(e)=> {
		//e.preventDefault();
		console.log("i am prop")
		this.setState({search_input: e.target.value});
	 }

	onClickFilter = (nodeId)=>{
		console.log(nodeId);
	}

    // fetch all of the children of all of the
    // original papers
    getChildrenOfOriginalPaper = (originalPapers)=>{
    	let originalPaperUrl = getChildrenUnion;
    	console.log(originalPapers)

   		let paperQuery = getChildrenUnion + "/" + "?id=" + originalPapers.id+ "/";
   		this.props.fetchOriginalPapers(paperQuery, originalPapers.id, originalPapers.title);

    	//let child = this.props.fetchOriginalPapers(paperQuery, originalPaperId, originalPapersTitle);
    	//return
    }

	render(){
		console.log(this.state.data.title);
		return(
			<GraphComp
				data={this.props.data}
				type={this.props.type}
				nodeCallBack = {this.onClickNode}

			/>
		)
	}
}

const mapDispatchToProps = (dispatch)=>{
	return({
		fetchOriginalPapers: (url, paperId, title)=>{dispatch(FetchNumberNodes(url, paperId, title, types.CACHED_PAPER_ORIGINAL_CHILDREN))}
	})
}
export default connect(null, mapDispatchToProps)(GraphControl);
