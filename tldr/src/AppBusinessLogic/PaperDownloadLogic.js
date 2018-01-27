import React, { Component } from 'react';


// because get paper can be a whole graph or
// sub-graph, to prevent code duplication,
// we let user write their own graph component
// and their own subscription function.
// Once that is done, this HOC will return
// a higher order function containing
// the graph component populated with the data
// from the subscriptionFunction. Then, simply
// call the HOC from DashBoardLogic.js 
// and it should display the resultant component
// on the dashboard. 
function GetContentFromServer(WrappedComp, subscriptionFunction){
	return(
		class GetPaper extends Component{
			constructor(props){
				super(props);
				this.state={
					inputData: subscriptionFunction(),
				};
			}

			render(){
				return(
					<WrappedComp 
						data={this.state.inputData} 
						{...this.props} 
					/>
				);
			}
		}
	);
}

export default GetContentFromServer;