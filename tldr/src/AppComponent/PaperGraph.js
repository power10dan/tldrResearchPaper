import Graph from 'react-graph-vis';
import React from 'react';


function transformDataToNode(rawData, type){
	let data = {
		nodes: [
				{id: 1, label: "Hello"}, 
				{id: 2, label: "boohoo"}, 
				{id: 3, label: "mooho"}, 
				{id: 4, label: "moon"},
				{id: 5, label: "bae"}],
		edges:[]		
			
	}

	if(type==="cited"){
		console.log("hi")
		data.nodes.push({id: 6, label:rawData});
		data.edges.push({from: 6, to: 1})
		data.edges.push({from: 6, to: 2})
		data.edges.push({from: 6, to: 3})
		data.edges.push({from: 6, to: 4})
		data.edges.push({from: 6, to: 5})
	} 

	return data;
}

const configGeneration =()=>{
	let myConfig = {
		layout: {
		    hierarchical: true
		},
		
		edges: {
		   color: "#000000"
		},

		interaction:{
			zoomView:false,
		},

		manipulation:{
			enabled: false
		}
		
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
	let data = transformDataToNode(props.data, props.type);
	let myConfig = configGeneration();
	let eventsCallback = events();
	return(
		<Graph 
			graph={data}
			options={myConfig}
			events={eventsCallback}
			style={{height: "250px"}}
		/>
	);
}

export default GraphComp;