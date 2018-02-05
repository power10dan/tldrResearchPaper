import React from 'react';
import { Graph } from 'react-d3-graph';

function transformDataToNode(rawData){
	let nodes = rawData.nodes;
	let links = rawData.links;

	return [nodes, links]
}

function configGeneration(configType){
	let nodeConfig = configType.nodeConf;
	let linkConfig = configType.linkConf;
	let myConfig = {
		"automaticRearrangeAfterDropNode": false,
  		"height": 400,
  		"highlightDegree": 1,
  		"highlightOpacity": 1,
  		"linkHighlightBehavior": true,
  		"maxZoom": 8,
  		"minZoom": 0.1,
  		"nodeHighlightBehavior": false,
  		"panAndZoom": false,
  		"staticGraph": false,
  		"width": 800,
  		"node": nodeConfig,
  		"link": linkConfig,
	}

	return myConfig;
}


function GraphComp(props){
	let data = transformDataToNode(props.data);
	let myConfig = configGeneration(props.configType);
	return(
		<Graph 
			id='graph-id'
			data={data}
			config={myConfig}
			onClickNode={props.onClickNodeFunc}
		/>
	);
}

export default GraphComp;