import React from 'react';
import SideNavCustom from '../AppComponents/AppSideBar';
import { connect } from 'react-redux';

class UpdateSideNav extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			c_username: ""
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({c_username: nextProps.st_username});
	}

	render(){
		if(this.state.c_username !== ""){
			// render sidenav with props
			return(
				<SideNavCustom cred={this.state.c_username} />
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
    const {st_username} = state.userProfileReducer;
    return {
      st_username,
    };
}

const connectedSideNav = connect(mapStateToProps)(UpdateSideNav);
export { connectedSideNav as SideNavStates};
