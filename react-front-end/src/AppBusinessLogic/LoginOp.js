import React from 'react';
import { connect } from 'react-redux';
import LoginComp from '../AppComponents/LoginComp.js';
import ErrSnack from '../AppComponents/ErrDialog.js';
import { loginAction, logInFailedAction} from '../ReduxFolder/Actions/LoginActions.js';
import {isLoadingAction } from '../ReduxFolder/Actions/LoadingActions.js';
import {dialogOpenAction, dialogCloseAction} from '../ReduxFolder/Actions/DialogActions.js';
import {SideNavStates} from '../AppBusinessLogic/SideBarUpdate';

 
class LoginOperations extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userName: "",
			userTempPass: "",
			userPass: "",
			isLoginSuccess: false,
			errMessage: "",
			successMessage: "",
			opDialog: false,
			isRegist: false,
		};
	}

	// because mapStatetoProps is async, props will 
	// only be updated only when the component receives the props,
	// which is in sometime we don't know. Thus, we use
	// componentWillReceiveProps to set our new state
	componentWillReceiveProps(nextProps) {
		this.setState({isLoginSuccess: nextProps.isLoggedIn});
		this.setState({errMessage: nextProps.errorMessage});
		this.setState({opDialog: nextProps.isOpenDialog});
		this.setState({isRegist: nextProps.isRegistered});
		this.setState({successMessage: nextProps.successMess});
	}

	formClean = ()=>{
		// clean up
	   	this.setState({userName: ""});
	   	// we have to clear out the text field variable
		this.setState({userTempPass: ""});
		// we also have to clear out our saved hash
		this.setState({userPass: ""});

	}

    handleSubmit = () => {

        if(this.state.userName === "" || typeof this.state.userName === "undefined") {
        	this.props.updateFailed("Please enter user name");
        	this.props.openDialog();
        	setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
        	this.props.isLoading(false);
       
        } else if(this.state.userPass === "" || typeof this.state.userPass === "undefined"){
        	this.props.updateFailed("Please enter password");
        	this.props.openDialog();
        	setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
        	this.props.isLoading(false);
        
        } else {
        	//FIXME: Monkey patch: put userName in userEmail parameter. 
        	this.props.loginOp(this.state.userName, this.state.userName, this.state.userPass);
        	// we don't perform open dialog here because isLoginSuccess is set asyncally;
        	// there will be a time where isLoginSuccess was not properly set. This results
        	// in a dialog with failed to login message opened before the dialog 
        	// with success message is opened.
        	setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
        	this.formClean()
        } 
    }

    storeHash = ( hash) =>{
    	this.setState({userPass: hash});
    }

	userPasswordGet = (userPassword) => {
		// we want to clear the text field right after user clicks LOGIN button.
		// But if we use the same variable for the text field to keep track of user's input,
		// when the same variable gets hashed, the updated hash
		// is going to be displayed on the password textfield also.
		// Thus, we save the password into a temp variable,
		// then we hash the temp varible password and then
		// return it to userPass.
		this.setState({userTempPass: userPassword.target.value}, ()=>{
			this.storeHash( this.state.userTempPass)
		});
	}

	userNameGet = (userNameAcc) => {
		// we do not allow spaces in the user account name
		let strippedUserNameAcc = userNameAcc.target.value.replace(/\s/g, "");
		this.setState({userName: strippedUserNameAcc});
		
	}

	userLogin = () =>{
		this.handleSubmit();
	}

	functionPackages = () => {
		let packageHash = {
			GetUserName: this.userNameGet,
			GetPassword: this.userPasswordGet,
			LoginSubmit: this.handleSubmit 
		};

		return packageHash;
	}

	render(){
      const packagesLogin = this.functionPackages();
      if(this.state.isRegist === true || this.state.isLoginSuccess === true){
      	  	// in future, return something more meaningful
      	 	return(
      	 			<div>
	      	 			<SideNavStates  />
			      		<ErrSnack message={this.state.successMessage} openDialog={this.state.opDialog} />
			      	</div>
		      	);
      }

      if(this.state.isLoginSuccess === false ){
	      	return (
	      		<div>
	      			<SideNavStates  />
		      		<LoginComp package={packagesLogin} name={this.state.userName} pass={this.state.userTempPass} />
		      		<ErrSnack message={this.state.errMessage} openDialog={this.state.opDialog} />
		      	</div>
	      	);
      } 
     
    }
}

// "connects" to the state tree, and return updated 
// states when state tree is updated.
function mapStateToProps(state) {
    const { isLoggedIn, errorMessage, isOpenDialog, successMess} = state.authentication;
    const {isRegistered} = state.createAccReducer;
    return {
        isLoggedIn,
        errorMessage,
        isOpenDialog,
        isRegistered,
        successMess
    };
}

// maps dispatch function to props, so we can pass 
// them in our props function 
function mapDispatchToProps(dispatch){
	return({
		updateFailed: (message)=>{dispatch(logInFailedAction(message));},
		loginOp: (userName, userEmail, userPass) =>{dispatch(loginAction(userName, userEmail, userPass));},
		isLoading: (stat)=>{dispatch(isLoadingAction(stat));},
		openDialog: () =>{dispatch(dialogOpenAction())},
		closeDialog: () =>{dispatch(dialogCloseAction())},
	})
}

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginOperations);
export { connectedLogin as LoginOps};
