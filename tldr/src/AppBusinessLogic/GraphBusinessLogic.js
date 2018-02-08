import React, { Component } from 'react';
import GraphComp from '../AppComponent/PaperGraph.js';

class GraphControl extends Component{
	constructor(props){
		super(props);
	}

	onClickNode = (nodeId)=>{
		console.log(nodeId);
	}

	render(){
		return(
			<GraphComp
				data={this.props.data}
				type={this.props.type}
				nodeCallBack = {this.onClickNode}
				
			/>
		)
	}
}

export default GraphControl;