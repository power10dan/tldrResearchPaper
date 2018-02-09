import Graph from 'react-graph-vis';
import React from 'react';


function transformDataToNode(rawData, type){
	let data = {
		nodes: [
					{id: 2, label: "boohoo"}, 
					{id: 3, label: "mooho"}, 
					{id: 4, label: "moon"},
					{id: 5, label: "bae"}
			   ],
		edges:[]			
	}

	if(type==="Original"){
		data.nodes.push({id: 6, 
						 widthConstraint: {minimum: 10}, 
						 heightConstraint: { minimum: 30 }, 
						 label:rawData, 
						 color: '#FF9800', 
						 font: '15px Dosis' });
		data.edges.push({from: 6, to: 2})
		data.edges.push({from: 6, to: 3})
		data.edges.push({from: 6, to: 4})
		data.edges.push({from: 6, to: 5})
	}  else {
		data.nodes.push({id: 6, 
						 widthConstraint: {minimum: 10}, 
						 heightConstraint: { minimum: 30 }, 
						 label:rawData, 
						 color: '#FF9800', 
						 font: '15px Dosis' });
		data.edges.push({from: 6, to: 2})
	}

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
	let data = transformDataToNode(props.data, props.type);
	let myConfig = configGeneration();
	let eventsCallback = events();
	return(
		<Graph 
			graph={data}
			options={myConfig}
			events={eventsCallback}
			style={{height: "350px", width: "550px"}}
		/>
	);
}

export default GraphComp;