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
    
   // all component state variables are prefix "c_" to denote they belong to the
  // component state
		this.state = {
			c_user_name: "",                   // The user's user name
			c_user_tmp_pass: "",               // A tmp password for the user
			c_user_pass: "",                   // the user's password
			c_is_login_success: false,         // Did the user login successfully?
			c_err_msg: "",                     // an error message on failed login
			c_success_msg: "",                 // success msg if successful login
			c_op_dialog: false,                // open or close the dialog box
			c_is_rgst: false,                  // is the user registered or not?
		};
	}

  /** 
  * Component will receive props maps nextProps, which are fields from the next
  * state i.e. the state that is created from the old state and an action in the
  * reducers to the controllers component props. this.setState is setting the
  * controllers state with the new redux states fields
  */
	componentWillReceiveProps(nextProps) {
		this.setState({c_is_login_success: nextProps.st_is_logged_in});
		this.setState({c_err_msg: nextProps.st_error_msg});
		this.setState({c_op_dialog: nextProps.st_is_open_dialog});
		this.setState({c_is_rgst: nextProps.isRegistered});
		this.setState({c_success_msg: nextProps.st_success_msg});
	}


	formClean = ()=>{
		// clean up
	   	this.setState({c_user_name: ""});
	   	// we have to clear out the text field variable
		this.setState({c_user_tmp_pass: ""});
		// we also have to clear out our saved hash
		this.setState({c_user_pass: ""});

	}

    handleSubmit = () => {

        if(this.state.c_user_name === "" || typeof this.state.c_user_name === "undefined") {
        	this.props.updateFailed("Please enter user name");
        	this.props.openDialog();
        	setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
        	this.props.isLoading(false);
       
        } else if(this.state.c_user_pass === "" || typeof this.state.c_user_pass === "undefined"){
        	this.props.updateFailed("Please enter password");
        	this.props.openDialog();
        	setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
        	this.props.isLoading(false);
        
        } else {
        	//FIXME: Monkey patch: put c_user_name in c_user_email parameter. 
        	this.props.loginOp(this.state.c_user_name, this.state.c_user_name, this.state.c_user_pass);
        	// we don't perform open dialog here because c_is_login_success is set asyncally;
        	// there will be a time where c_is_login_success was not properly set. This results
        	// in a dialog with failed to loginAction message opened before the dialog 
        	// with success message is opened.
        	setTimeout(()=>{this.props.closeDialog()}, 2000); // set dialog close after two seconds
        	this.formClean()
        } 
    }

    storeHash = ( hash) =>{
    	this.setState({c_user_pass: hash});
    }

	userPasswordGet = (userPassword) => {
		// we want to clear the text field right after user clicks LOGIN button.
		// But if we use the same variable for the text field to keep track of user's input,
		// when the same variable gets hashed, the updated hash
		// is going to be displayed on the password textfield also.
		// Thus, we save the password into a temp variable,
		// then we hash the temp varible password and then
		// return it to c_user_pass.
		this.setState({c_user_tmp_pass: userPassword.target.value}, ()=>{
			this.storeHash( this.state.c_user_tmp_pass)
		});
	}

	userNameGet = (userNameAcc) => {
		// we do not allow spaces in the user account name
		let strippedUserNameAcc = userNameAcc.target.value.replace(/\s/g, "");
		this.setState({c_user_name: strippedUserNameAcc});
		
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
      if(this.state.c_is_rgst === true || this.state.c_is_login_success === true){
      	  	// in future, return something more meaningful
      	 	return(
      	 			<div>
	      	 			<SideNavStates  />
			      		<ErrSnack message={this.state.c_success_msg} openDialog={this.state.c_op_dialog} />
			      	</div>
		      	);
      }

      if(this.state.c_is_login_success === false ){
	      	return (
	      		<div>
	      			<SideNavStates  />
		      		<LoginComp package={packagesLogin} name={this.state.c_user_name} pass={this.state.c_user_tmp_pass} />
		      		<ErrSnack message={this.state.c_err_msg} openDialog={this.state.c_op_dialog} />
		      	</div>
	      	);
      } 
     
    }
}

// "connects" to the state tree, and return updated 
// states when state tree is updated.
function mapStateToProps(state) {
  const {st_is_logged_in,
         st_error_msg,
         st_is_open_dialog,
         st_success_msg} = state.authentication;
    const {isRegistered} = state.createAccReducer;
    return {
      st_is_logged_in,
      st_error_msg,
      st_is_open_dialog,
      isRegistered,
      st_success_msg
    };
}

// maps dispatch function to props, so we can pass 
// them in our props function 
function mapDispatchToProps(dispatch){
	return({
		updateFailed: (message)=>{dispatch(logInFailedAction(message));},
		loginOp: (c_user_name, c_user_email, c_user_pass) =>{dispatch(loginAction(c_user_name, c_user_email, c_user_pass));},
		isLoading: (stat)=>{dispatch(isLoadingAction(stat));},
		openDialog: () =>{dispatch(dialogOpenAction())},
		closeDialog: () =>{dispatch(dialogCloseAction())},
	})
}

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginOperations);
export { connectedLogin as LoginOps};
