import React from 'react';
import { connect } from 'react-redux';
import CreateProfile from '../AppComponents/CreateProfile.js';
import {createProfileAction} from '../ReduxFolder/Actions/CreateProfileActions.js';
import { createFailedAction, resetDialogAction} from '../ReduxFolder/Actions/CreateProfileActions.js';
import { DialogOpenCreate , DialogCloseCreate } from '../ReduxFolder/Actions/DialogActions.js';
import {isLoading } from '../ReduxFolder/Actions/LoadingActions.js';
import ErrSnack from '../AppComponents/ErrDialog.js';


class CreateUserProfile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			newUserName: "",
			newUserEmail: "",
			newUserTempPassword: "",
			newUserTempPassword2: "",
			newUserPassword: "",
			newUserPassword2: "",
      		isRegistered: false,
      		errMessage: " ",
      		successMessage: " ",
      		opDialog: false, // whether to open the create profile component or not
      		opMessageDialog: false // whether to open error or success snack bar error box
		};
	}

	componentWillReceiveProps(nextProps){
		this.setState({isRegistered: nextProps.isRegistered});
		this.setState({errMessage: nextProps.errorMessageProfile});
		this.setState({successMessage: nextProps.successMessageProfile});
		this.setState({opMessageDialog: nextProps.isOpenDialog});
		if(nextProps.dismissProfileDialog === true){
			this.setState({opDialog: false});
		} else{
			this.setState({opDialog: true});	
		}
	}

	sanitizeUserInput = (userName, userEmail, userPass, userPass2) => {
		let validEmailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
		let containSpaces = new RegExp("/\s/");
		if(userName === "" || containSpaces.test(userName)){
			this.props.updateFailed("Please enter a valid User Name with no spaces");
			return false;
		}

		if(userEmail === ""){
			this.props.updateFailed("Please Input User Email");
    		return false;
		}

		// sanitize user email
		if(validEmailRegex.test(userEmail) === false){
			this.props.updateFailed("Please input valid User Email");
			return false;
		}

		if(userPass.length < 8 || containSpaces.test(userPass)){
			this.props.updateFailed("Password must be at least 8 characters with no spaces");
			return false;
		}

		if(containSpaces.test(userPass)){
			this.props.updateFailed("Password must not contain spaces");
			return false;
		}

		if (userPass === " " || userPass2 === " "){
			this.props.updateFailed("Please Input User Password");
    		return false;
		}

		if(userPass !== userPass2){
			this.props.updateFailed("Password Doesn't match");
			return false 

		}
			
		// if we get here, all input fields are sanitized
		return true;
	}

	clearForum = () =>{
			this.setState({newUserEmail: ""}, () =>{
    			this.setState({newUserPassword: ""}, () =>{
    				this.setState({newUserPassword2: ""}, () => {
    					this.setState({newUserName: ""}, () => {
    						this.setState({newUserTempPassword: ""}, () => {
    							this.setState({newUserTempPassword2: ""}, () => {
    							})
    						}) 	
    					})	
    				})
    			});
    		});
	}

    handleSubmit= () => {
    	let userName = this.state.newUserName;
    	let userEmail = this.state.newUserEmail;
    	let userPass = this.state.newUserPassword;
    	let userPass2 = this.state.newUserPassword2;

    	let sanitized = this.sanitizeUserInput(userName, userEmail, userPass, userPass2);
    	if(sanitized === true){
            // only send the first password twice so the user is created
	         // if we send both then they'll never match because of hash
	   	    this.props.createUser(userName,  userPass, userPass2,userEmail);

	   	    if(this.state.isRegistered === false){
	   	    	this.props.openDialog();
    			setTimeout(()=>{this.props.closeDialog()}, 2000);
    			this.clearForum();

    		} else {
    			this.props.openDialog();
    			setTimeout(()=>{this.props.closeDialog()}, 2000);
    			this.clearForum();
    		}
    					 
  		 } else {
    			this.props.openDialog();
    			setTimeout(()=>{this.props.closeDialog()}, 2000);
    			this.clearForum();
    	}	 	
    }
  
    //create user Get methods.
	newUserEmailGet = (userEmail) => {
		this.setState({newUserEmail : userEmail.target.value});
	}

     
  	// this repetition is screaming for a higher ordered function
  	storeHash = (hash) => {
  	 	this.setState({newUserPassword: hash});
  	 	this.setState({newUserPassword2: hash});
  	}

	newUserPasswordGet = (userPassword) => {
		  this.setState({newUserPassword : userPassword.target.value});
	}
	newUserPasswordGet2 = (userPassword) => {
		  this.setState({newUserPassword2 : userPassword.target.value});
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

	packageVal = () =>{
		return({
			userName: this.state.newUserName,
			userEmail: this.state.newUserEmail,
			userPassword: this.state.newUserPassword,
			userPassword2: this.state.newUserPassword2
		})
	}

	render(){
		const funcPackage = this.packageFunc();
		const packageVal = this.packageVal();
		if(this.state.isRegistered === true){
			return(
				<div>
					<ErrSnack message={this.state.successMessage} openDialog={this.state.opMessageDialog} />
					<CreateProfile  vals= {packageVal} callBacks={funcPackage} isOpen={this.state.opDialog} />
				</div>
		    );
		} else{
			return(
				<div>
					<ErrSnack message={this.state.errMessage} openDialog={this.state.opMessageDialog} />
					<CreateProfile vals= {packageVal} callBacks={funcPackage} isOpen={this.state.opDialog} />
				</div>
			)
		}

	}
}

function mapStateToProps(state){
	const { isRegistered, 
		    errorMessageProfile,
		    successMessageProfile, 
		    isOpenDialog, dismissProfileDialog} = state.createAccReducer;
	return {
		  isRegistered,
		  isOpenDialog,
		  errorMessageProfile, 
		  successMessageProfile,
		  dismissProfileDialog
	}
}

function mapDispatchToProps(dispatch){
	return({
		createUser: (userName, userPass, userPass2, userEmail) =>
        			{dispatch(createProfileAction(userName, userPass, userPass2, userEmail));},
		isLoad: (isLoadingStatus) =>{dispatch(isLoading(isLoadingStatus));},
		updateFailed: (message)=>{dispatch(createFailedAction(message));},
		openDialog: () =>{dispatch(DialogOpenCreate())},
		closeDialog: () =>{dispatch(DialogCloseCreate())},
		resetDialog: () =>{dispatch(resetDialogAction())}

	})
}

const connectedCreateProfile = connect(mapStateToProps, mapDispatchToProps)(CreateUserProfile);
export {connectedCreateProfile as ProfileOps};


