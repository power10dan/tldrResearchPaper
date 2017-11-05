import React from 'react';
import { connect } from 'react-redux';
import LoginComp from '../AppComponents/LoginComp.js';
import ErrSnack from '../AppComponents/ErrDialog.js';
import { Login, LogInFailed, isLoading} from '../ReduxFolder/Actions/actions.js';
import {DialogOpen, DialogClose} from '../ReduxFolder/Actions/DialogActions.js';
import bcrypt from 'bcryptjs';
 
class LoginOperations extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userName: "",
			userTempPass: "",
			userPass: "",
			isLoginSuccess: false,
			errMessage: "",
			opDialog: false,
		};
	}

	// because mapStatetoProps is async, props will 
	// only be updated only when the component receives the props,
	// which is in sometime we don't know. Thus, we use
	// componentWillReceiveProps to set our new state
	componentWillReceiveProps(nextProps) {
		this.setState({isLoginSuccess: nextProps.loggedIn});
		this.setState({errMessage: nextProps.errorMessage});
		this.setState({opDialog: nextProps.isOpenDialog});
	}

    handleSubmit = () => {
    	this.props.isLoading(true);
        const { dispatch } = this.props;
        let userAcc = this.state.userName;
        let userPassword = this.state.userPass;

        if(userAcc === "" || typeof userAcc === "undefined") {
        	this.props.updateFailed("Please enter user name");
        	this.props.openDialog();
        	setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
        	this.props.isLoading(false);
       
        } else if(userPassword === "" || typeof userPassword === "undefined"){
        	this.props.updateFailed("Please enter password");
        	this.props.openDialog();
        	setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
        	this.props.isLoading(false);
        
        } else {
        	this.props.loginOp(userAcc, userPassword);
        
        	if(this.state.isLoginSuccess === false){
        		this.props.openDialog();
	        	setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
	        	this.props.isLoading(false);
        	}

        	if(this.state.isLoginSuccess === true){
        		this.props.openDialog();
	        	setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
	        	this.props.isLoading(false);
        	}

        	// clean up
   			this.setState({userName: ""});
   			// we have to clear out the text field variable
			this.setState({userTempPass: ""});
			// we also have to clear out our saved hash
			this.setState({userPass: ""});
        } 
    }

    storeHash = (err, hash) =>{
    	this.setState({userPass: hash});
    }

	userPasswordGet = (userPassword) => {
		// we want to clear the text field right after user clicks LOGIN button.
		// But if we use the same variable for the text field to keep track of user's inpu,
		// when the same variable gets hashed, the updated hash
		// is going to be displayed on the password textfield also.
		// Thus, we save the password into a temp variable,
		// then we hash the temp varible password and then
		// return it to userPass.
		this.setState({userTempPass: userPassword.target.value}, ()=>{
			bcrypt.hash(this.state.userTempPass, 10, this.storeHash);
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
      console.log(packagesLogin)
      let state = null;
      // only render when login fails, else we are OK
      if(this.state.isLoginSuccess === false ){
	      	return (
	      		<div>
		      		<LoginComp package={packagesLogin} name={this.state.userName} pass={this.state.userTempPass} />
		      		<ErrSnack message={this.state.errMessage} openDialog={this.state.opDialog} />
		      	</div>
	      	)
      } else{
      	  	// in future, return something more meaningful
      	 	return(null);
      }
     
    }
}

// "connects" to the state tree, and return updated 
// states when state tree is updated.
function mapStateToProps(state) {
    const { loggedIn, errorMessage } = state.authentication;
    const { isOpenDialog } = state.openDialog
    return {
        loggedIn,
        errorMessage,
        isOpenDialog
    };
}

// maps dispatch function to props, so we can pass 
// them in our props function 
function mapDispatchToProps(dispatch){
	return({
		updateFailed: (message)=>{dispatch(LogInFailed(message));},
		loginOp: (userName, userPass) =>{dispatch(Login(userName, userPass));},
		isLoading: (stat)=>{dispatch(isLoading(stat));},
		openDialog: () =>{dispatch(DialogOpen())},
		closeDialog: () =>{dispatch(DialogClose())},
	})
}

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginOperations);
export { connectedLogin as LoginOps};
