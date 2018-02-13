import Graph from 'react-graph-vis';
import React from 'react';


function transformDataToNode(originalNode, citedNodes){
	let data ={
		nodes: [],
		edges: []
	}

	let nodeOriginTruncate = originalNode.title[0].substring(0, 10) + "..."

	data.nodes.push({id: originalNode.id, 
					 widthConstraint: {minimum: 40}, 
					 heightConstraint: { minimum: 40 }, 
					 label:nodeOriginTruncate, 
					 color: '#FFCC80', 
					 font: '12px Dosis' });

	citedNodes.forEach((elem)=>{
		let citedNodeTruncation = elem.title[0].substring(0,8) + "..."
		data.nodes.push({id:elem.id, 
						 widthConstraint: {minimum: 30}, 
						 heightConstraint: { minimum: 30 }, 
						 label:citedNodeTruncation, 
						 color: '#FF9800', 
						 font: '10px Dosis' 
					   });
		data.edges.push({from: originalNode.id, to: elem.id, length: 250});
	})

	return data;
}

const configGeneration =()=>{
	let myConfig = {
		layout: {
		    hierarchical: false
		},
		
		edges: {
		   color: "#000000"
		},

		nodes:{
			size: 25,
		},
	}

	return myConfig;
}

const events = (getNodesClickedFunction, dataToSearch)=>{
	let event = {
		select: (event)=> {
        	const { nodes } = event;
        	getNodesClickedFunction(nodes, dataToSearch);
    	}
	}
	return event;	 
}

function GraphComp(props){
	let data = null;
	let newEvent = null;
	if(props.typeOfPap === "Uploaded"){
		data = transformDataToNode(props.rootNode, props.citedNode);
		newEvent = events(props.clickNodeCallBack, props.papersDatabase);
	} else {
		let citedNodeTruncation = props.node.title[0].substring(0,8) + "..."
		data = {
			nodes: [{id: props.node.id, 
					 label:citedNodeTruncation,
					 widthConstraint: {minimum: 40}, 
					 heightConstraint: { minimum: 40 }, 
					 color: '#FFCC80', 
					 font: '12px Dosis' 
				   }],

			edges: []
		}
	}

	let myConfig = configGeneration();

	return(
		<Graph 
			graph={data}
			options={myConfig}
			events={newEvent}
			style={{height: "370px", width: "410px"}}
		/>
	);
}

export default GraphComp;