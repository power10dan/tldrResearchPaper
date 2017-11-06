import React from 'react';
import SideNavCustom from '../AppComponents/AppSideBar';
import { connect } from 'react-redux';

class UpdateSideNav extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			userName: ""
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({userName: nextProps.userName});
	}

	render(){
		if(this.state.userName !== ""){
			// render sidenav with props
			return(	
				<SideNavCustom cred={this.state.userName} />
			)
		} else {
			return(
				<SideNavCustom cred={"Stranger"} />
			)
		}
	}
}

// "connects" to the state tree, and return updated 
// states when state tree is updated.
function mapStateToProps(state) {
	// get stuff from the UserProfile slice from the state tree
    const {userName } = state.UserProfile;
    return {
        userName,
    };
}

const connectedSideNav = connect(mapStateToProps)(UpdateSideNav);
export { connectedSideNav as SideNavStates};
