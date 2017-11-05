import React from 'react';
import { connect } from 'react-redux';
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
			newUserPassword2: "",
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

	sanitizeUserInput = (userName, userEmail, userPass, userPass2) => {
		let validEmailRegex = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
		if(userName === ""){
			this.props.updateFailed("Please Input User Name");
			return false;
		}

		if(userEmail === ""){
			this.props.updateFailed("Please Input User Email");
    		return false;
		}

		if (userPass === " " || userPass2 === " "){
			this.props.updateFailed("Please Input User Password");
    		return false;
		}

		if(userPass.localeCompare(userPass2) !== 0){
			this.props.updateFailed("You did not type matching password");
			return false;
		}
		// sanitize user email
		if(validEmailRegex.test(userEmail) == false){
			this.props.updateFailed("Invalid User Email");
			return false;
		}

		// if we get here, all input fields are sanitized
		return true;
	}

    handleSubmit= () => {
    	const {dispatch} = this.props;
    	let userName = this.state.newUserName;
    	let userEmail = this.state.newUserEmail;
    	let userPass = this.state.newUserPassword;
    	let userPass2 = this.state.newUserPassword2;

    	let sanitized = this.sanitizeUserInput(userName, userEmail, userPass, userPass2);
    	if(sanitized === false){
    		this.props.openDialog();
    		setTimeout(()=>{this.props.closeDialog()}, 2000); 
    		return;
    	} else{
    		this.props.isLoad(true);
    		this.props.createUser(userName, userPass, userPass2, userEmail);
    		
    		if(this.state.isLoggedIn === false){
    			this.props.updateFailed("Please Input User Password");
	    		this.props.openDialog();
	    		setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
    		}

    		if(this.state.isLoggedIn === true){
    			this.props.openDialog();
    			setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
    		}

    		this.setState({newUserEmail: " "})
		    this.setState({newUserPassword: " "})
		    this.setState({newUserPassword2: " "})
		    this.setState({newUserName: " "})
    	}        	
    }

    //create user Get methods.
	newUserEmailGet = (userEmail) => {
		this.setState({newUserEmail : userEmail.target.value});
	}
	newUserPasswordGet = (userPassword) => {
		this.setState({newUserPassword : userPassword.target.value});
	}
  // this repetition is screaming for a higher ordered function
	newUserPasswordGet2 = (userPassword2) => {
		this.setState({newUserPassword2 : userPassword2.target.value});
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
			UserPassword2: this.newUserPasswordGet2,
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
		  createUser: (userName, userPass, userPass2, userEmail) =>
          {dispatch(createProfile(userName, userPass, userPass2, userEmail));},
		isLoad: (isLoadingStatus) =>{dispatch(isLoading(isLoadingStatus));},
		updateFailed: (message)=>{dispatch(LogInFailed(message));},
		openDialog: () =>{dispatch(DialogOpen())},
		closeDialog: () =>{dispatch(DialogClose())},

	})
}

const connectedCreateProfile = connect(mapStateToProps, mapDispatchToProps)(CreateUserProfile);
export {connectedCreateProfile as ProfileOps};


