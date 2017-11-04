import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginComp from '../AppComponents/LoginComp.js';
import { createProfile } from '../ReduxFolder/Actions/CreateProfileActions.js';

//TODO: FIXME
class CreateUserProfile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			newUserName: "",
			newUserEmail: "",
			newUserPassword: "",
			// if create user profile is successful, then we set this as true
			// because technically the user is "logged in"
			isLoggedIn: false  
		};
	}

    handleSubmit= () => {
    	const {dispatch} = this.props;
    	let useName = this.state.newUserName;
    	let useEmail = this.state.newUserEmail;
    	let userPass = this.state.newUserPassword;

    	if(userName === ""){
    		this.props.updateFailed("Please Input User Name");
    		this.props.openDialog();
    		setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
    	} else if(userEmail === ""){
    		this.props.updateFailed("Please Input User Email");
    		this.props.openDialog();
    		setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
    	} else if(userPass === ""){
    		this.props.updateFailed("Please Input User Password");
    		this.props.openDialog();
    		setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
    	} else {
    		this.props.isLoad(true);
    		this.props.createUser(userName, userPass, userEmail);
    		if(this.state.isLoggedIn == false){
    			this.props.updateFailed("Please Input User Password");
	    		this.props.openDialog();
	    		setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
    		}


    	}

        this.setState({newUserEmail: " "})
		this.setState({newUserPassword: " "})
		this.setState({newUserName: " "})	

        this.props.isLoad(false);
    }

    //create user Get methods.
	newUserEmailGet = (userEmail) => {
		this.setState({newUserEmail : userEmail.target.value});
	}
	newUserPasswordGet = (userPassword) => {
		this.setState({newUserPassword : userPassword.target.value});
	}
	newUserNameGet = (userName) => {
		this.setState({newUserName : userName.target.value});
	}

	// button for submitting to create user account
	createNewUser = () =>{	
		this.handleSubmit();
	}
	
	render(){


	}
}

function mapStateToProps(state){
	const { loggedIn } = state.authentication;


}

function mapDispatchToProps(dispatch){
	return({
		createUser: (userName, userPass, userEmail) => {dispatch(createProfile(userName, userPass, userEmail));}
		isLoad: (isLoadingStatus) =>{dispatch(isLoading(isLoadingStatus));},
		updateFailed: (message)=>{dispatch(LogInFailed(message));},
		openDialog: () =>{dispatch(DialogOpen())},
		closeDialog: () =>{dispatch(DialogClose())},

	})
}

const connectedCreateProfile = connect(mapStateToProps, mapDispatchToProps)(CreateUserProfile);
export {connectedCreateProfile as profileOps};


