import React, { Component } from 'react';
import DashBoardComps from '../AppComponent/DashBoardComps.js';
import { withStyles } from 'material-ui/styles';

const DashBoardControlHOC = (DashBoardElem) =>{
	return(
		class DashBoardControl extends Component{
			constructor(props){
				super(props);
				this.state={
					open: false,
					filterData: ["Author"],
				}
				this.marginLeft=""
			}

			handleDrawerOpen = () => {
				this.setState({open: true});
			}

			handleDrawerClose = ()=>{
				this.setState({open: false});
			}

			
			render(){
				if(this.state.open === false){
					this.marginLeft= "270px";
				} else{
					this.marginLeft = "320px";
				}
				
				return(
					<div>
						<DashBoardComps
							handleDrawerOpen={this.handleDrawerOpen}
							handleDrawerClose={this.handleDrawerClose}
							open={this.state.open}
							FilterData={this.state.filterData}
						/>	
						<DashBoardElem 
							{...this.props}
							marginLeftBorder={this.marginLeft}
						/>						
					</div>
				);
			}
		}
	);
}
	
export default DashBoardControlHOC