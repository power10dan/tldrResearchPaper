import React, { Component } from 'react';
import DashBoardComps from '../AppComponent/DashBoardComps.js';

const DashBoardControlHOC = (DashBoardElem, typeOfDashContent) =>{
	return(
		class DashBoardControl extends Component{
			constructor(props){
				super(props);
				this.state={
					open: false,
					filterData: ["Author"],
					currentPage: 0,
				}
				this.marginLeft="";
				this.handleCurrPage();

			}

			handleDrawerOpen = () => {
				this.setState({open: true});
			}

			handleDrawerClose = ()=>{
				this.setState({open: false});
			}

			handleCurrPage = ()=>{
				if(typeOfDashContent === "Login"){
					this.setState({currentPage: 0});
				} else if(typeOfDashContent === "App Configuration"){
					this.setState({currentPage: 1});
				} else if(typeOfDashContent === "Conference Selection"){
					this.setState({currPage: 2});
				} else{
					this.setState({currentPage: 3});
				}
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
							actionBarTitle={typeOfDashContent} 
							currPage={this.state.currentPage}
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