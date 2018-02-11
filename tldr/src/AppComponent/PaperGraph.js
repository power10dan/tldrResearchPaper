import Graph from 'react-graph-vis';
import React from 'react';


function transformDataToNode(originalNode, citedNodes){
	let dictIdNode = {};
	let data ={
		nodes: [],
		edges: []
	}

	data.nodes.push({id: originalNode.id, 
					 widthConstraint: {minimum: 10}, 
					 heightConstraint: { minimum: 30 }, 
					 label:originalNode.id.toString(), 
					 color: '#FF9800', 
					 font: '15px Dosis' });

	citedNodes.map((elem)=>{
		data.nodes.push({id:elem.id, 
						 widthConstraint: {minimum: 10}, 
						 heightConstraint: { minimum: 30 }, 
						 label:elem.id.toString(), 
						 color: '#FF9800', 
						 font: '15px Dosis' 
					   });
		data.edges.push({from: originalNode.id, to: elem.id, length: 150});
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

const events = ()=>{
	let event = {
		select: (event)=> {
        	const { nodes, edges } = event;
    	}
	}
	return event;	 
}

function GraphComp(props){
	let data = null;
	if(props.typeOfPap === "Uploaded"){
		data = transformDataToNode(props.rootNode, props.citedNode);
	} else {
		data = {
			nodes: [{id: 1, label:props.node.id.toString()}],
			edges: []
		}
	}

	let myConfig = configGeneration();
	let eventsCallback = events();

	return(
		<Graph 
			graph={data}
			options={myConfig}
			events={eventsCallback}
			style={{height: "350px", width: "400px"}}
		/>
	);
}

export default GraphComp;