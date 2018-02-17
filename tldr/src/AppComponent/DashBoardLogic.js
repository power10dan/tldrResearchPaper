import React, { Component } from 'react';
import DashBoardComps from '../AppComponent/DashBoardComps.js';

const DashBoardControlHOC = (DashBoardElem, typeOfDashContent, CurrPage) =>{
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

			}

			componentWillReceiveProps(){
				this.handleCurrPage();
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
							actionBarTitle={typeOfDashContent}
							currPage={CurrPage}
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
