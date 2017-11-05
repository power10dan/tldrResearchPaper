import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateProfile from '../AppComponents/CreateProfile.js';
import {createProfile} from '../ReduxFolder/Actions/CreateProfileActions.js';
import { LogInFailed, isLoading} from '../ReduxFolder/Actions/actions.js';
import {DialogOpen, DialogClose} from '../ReduxFolder/Actions/DialogActions.js';

class CreateUserProfile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			newUserName: "",
			newUserEmail: "",
			newUserPassword: "",
			// if create user profile is successful, then we set this as true
			// because technically the user is "logged in"
			error: " ",
			isLoggedIn: false,
			opDialog: false,
			disMissDialog: false,
		};
	}

	componentWillReceiveProps(nextProps){
		//this.setState({isLoggedIn: nextProps.loggedIn});
		//this.setState({error: nextProps.errorMessage});
		//this.setState({opDialog: nextProps.isOpenDialog});
	}

    handleSubmit= () => {
    	const {dispatch} = this.props;
    	let userName = this.state.newUserName;
    	let userEmail = this.state.newUserEmail;
    	let userPass = this.state.newUserPassword;

    	if(userName === ""){
    		this.props.updateFailed("User Name Field is Empty");
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

    		if(this.state.isLoggedIn == true){
    			this.props.openDialog();
    			setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds

    		}
    	}

        this.setState({newUserEmail: " "})
		this.setState({newUserPassword: " "})
		this.setState({newUserName: " "})	
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

	handleClickOpen = () =>{
		this.setState({opDialog: true});
	}

	handleClickClose = () =>{
		this.setState({opDialog: false});
	}

	packageFunc = () =>{
		return({
			UserEmail: this.newUserEmailGet,
			UserPassword: this.newUserPasswordGet,
			UserName: this.newUserNameGet,
			SubmitHand: this.createNewUser,
			HandleClickOpenDialog: this.handleClickOpen,
			HandleClickCloseDialog: this.handleClickClose
		})
	}
	
	render(){
		const funcPackage = this.packageFunc();
		let state = null
		if(this.state.disMissDialog == true){
			return(state);
		} else{
			return(
				<CreateProfile callBacks={funcPackage} isOpen={this.state.opDialog} />
			)
		}

	}
}

function mapStateToProps(state){
	const { loggedIn } = state.authentication;
	const { isOpenDialog } = state.openDialog
	return {
		loggedIn,
		isOpenDialog
	}
}

function mapDispatchToProps(dispatch){
	return({
		createUser: (userName, userPass, userEmail) => {dispatch(createProfile(userName, userPass, userEmail));},
		isLoad: (isLoadingStatus) =>{dispatch(isLoading(isLoadingStatus));},
		updateFailed: (message)=>{dispatch(LogInFailed(message));},
		openDialog: () =>{dispatch(DialogOpen())},
		closeDialog: () =>{dispatch(DialogClose())},

	})
}

const connectedCreateProfile = connect(mapStateToProps, mapDispatchToProps)(CreateUserProfile);
export {connectedCreateProfile as ProfileOps};


