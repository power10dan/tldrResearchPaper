import React from 'react';
import { connect } from 'react-redux';
import CreateProfile from '../AppComponents/CreateProfile.js';
import {createProfileAction} from '../ReduxFolder/Actions/CreateProfileActions.js';
import { createFailedAction, resetDialogAction} from '../ReduxFolder/Actions/CreateProfileActions.js';
import { dialogOpenCreateAction , dialogCloseCreateAction } from '../ReduxFolder/Actions/DialogActions.js';
import {isLoadingAction } from '../ReduxFolder/Actions/LoadingActions.js';
import ErrSnack from '../AppComponents/ErrDialog.js';


class CreateUserProfile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			c_new_username: "",                   // new user name
			c_new_useremail: "",                  // new user email
			c_new_user_pass: "",                  // new user password one
			c_new_user_pass2: "",                 // new user password two
      c_is_registered: false,               // true when user is registered
      c_err_msg: " ",                       // error message variable
      c_success_msg: " ",                   // success message variable
      c_open_prf_dialog: false,             // true to open create Profile dialog
      c_open_msg_dialog: false              // true to open err snack msg dialog
		};
	}

  /** 
  * Component will receive props maps nextProps, which are fields from the next
  * state i.e. the state that is created from the old state and an action in the
  * reducers to the controllers component props. this.setState is setting the
  * controllers state with the new redux states fields
  */
	componentWillReceiveProps(nextProps){
		this.setState({c_is_registered: nextProps.st_is_registered});
		this.setState({c_err_msg: nextProps.st_prf_err_msg});
		this.setState({c_success_msg: nextProps.st_prf_success_msg});
		this.setState({c_open_msg_dialog: nextProps.st_is_open_dialog});

		if(nextProps.st_dismiss_prf_dialog === true){
			this.setState({c_open_prf_dialog: false});
		} else{
			this.setState({c_open_prf_dialog: true});	
		}
	}

	sanitizeUserInput = (userName, userEmail, userPass, userPass2) => {
		let validEmailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
		let containSpaces = new RegExp("/\s/");
		if(userName === "" || containSpaces.test(userName)){
			this.props.getUpdateFailed("Please enter a valid User Name with no spaces");
			return false;
		}

		if(userEmail === ""){
			this.props.getUpdateFailed("Please Input User Email");
    		return false;
		}

		// sanitize user email
		if(validEmailRegex.test(userEmail) === false){
			this.props.getUpdateFailed("Please input valid User Email");
			return false;
		}

		if(userPass.length < 8 || containSpaces.test(userPass)){
			this.props.getUpdateFailed("Password must be at least 8 characters with no spaces");
			return false;
		}

		if(containSpaces.test(userPass)){
			this.props.getUpdateFailed("Password must not contain spaces");
			return false;
		}

		if (userPass === " " || userPass2 === " "){
			this.props.getUpdateFailed("Please Input User Password");
    		return false;
		}

		if(userPass !== userPass2){
			this.props.getUpdateFailed("Password Doesn't match");
			return false 

		}
			
		// if we get here, all input fields are sanitized
		return true;
	}

	clearForum = () =>{
			this.setState({c_new_useremail: ""}, () =>{
    		this.setState({c_new_user_pass: ""}, () =>{
    			this.setState({c_new_user_pass2: ""}, () => {
    				this.setState({c_new_username: ""}, () => {
    				})	
    			})
    		});
    	});
	}

    handleSubmit= () => {
    	let userName = this.state.c_new_username;
    	let userEmail = this.state.c_new_useremail;
    	let userPass = this.state.c_new_user_pass;
    	let userPass2 = this.state.c_new_user_pass2;

    	let sanitized = this.sanitizeUserInput(userName,
                                             userEmail,
                                             userPass,
                                             userPass2);
    	if(sanitized === true){
            // only send the first password twice so the user is created
	         // if we send both then they'll never match because of hash
	   	    this.props.getCreateUser(userName,  userPass, userPass2,userEmail);

	   	    if(this.state.c_is_registered === false){
	   	    	this.props.getOpenDialog();
    			setTimeout(()=>{this.props.getCloseDialog()}, 2000);
    			this.clearForum();

    		} else {
    			this.props.getOpenDialog();
    			setTimeout(()=>{this.props.getCloseDialog()}, 2000);
    			this.clearForum();
    		}
    					 
  		 } else {
    			this.props.getOpenDialog();
    			setTimeout(()=>{this.props.getCloseDialog()}, 2000);
    			this.clearForum();
    	}	 	
    }
  
    //create user Get methods.
	newUserEmailGet = (userEmail) => {
		this.setState({c_new_useremail : userEmail.target.value});
	}

     
  	// this repetition is screaming for a higher ordered function
  	storeHash = (hash) => {
  	 	this.setState({c_new_user_pass: hash});
  	 	this.setState({c_new_user_pass2: hash});
  	}

	newUserPasswordGet = (userPassword) => {
		  this.setState({c_new_user_pass : userPassword.target.value});
	}
	newUserPasswordGet2 = (userPassword) => {
		  this.setState({c_new_user_pass2 : userPassword.target.value});
	}

	newUserNameGet = (userName) => {
		this.setState({c_new_username : userName.target.value});
	}

	// button for submitting to create user account
	createNewUser = () =>{
		this.handleSubmit();
	}

	handleClickOpen = () =>{
		this.setState({c_open_prf_dialog: true});
	}

	handleClickClose = () =>{
		this.setState({c_open_prf_dialog: false});
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
			userName: this.state.c_new_username,
			userEmail: this.state.c_new_useremail,
			userPassword: this.state.c_new_user_pass,
			userPassword2: this.state.c_new_user_pass2
		})
	}

	render(){
		const funcPackage = this.packageFunc();
		const packageVal = this.packageVal();
		if(this.state.c_is_registered === true){
			return(
				<div>
					<ErrSnack message={this.state.c_success_msg}
                    getOpenDialog={this.state.c_open_msg_dialog}
          />
					<CreateProfile vals= {packageVal}
                         callBacks={funcPackage}
                         isOpen={this.state.c_open_prf_dialog}
          />
				</div>
		    );
		} else{
			return(
				<div>
					<ErrSnack message={this.state.c_err_msg}
                    getOpenDialog={this.state.c_open_msg_dialog}
          />
					<CreateProfile vals={packageVal}
                         callBacks={funcPackage}
                         isOpen={this.state.c_open_prf_dialog}
          />
				</div>
			)
		}
	}
}

/** 
  * mapStateToProps takes the redux state tree and maps fields, by name,
  * from the redux state tree to nextProps. This function is where the names
  * in nextProps, in ComponentWillReceiveProps, comes from
*/
function mapStateToProps(state){
	const { st_is_registered, 
          st_prf_err_msg,
          st_prf_success_msg, 
          st_is_open_dialog,
          st_dismiss_prf_dialog} = state.createAccReducer;
	return {
    st_is_registered,
    st_is_open_dialog,
    st_prf_err_msg, 
    st_prf_success_msg,
    st_dismiss_prf_dialog
	}
}

/** 
  * mapDispatchToProps inserts functions that we define into the component props
  * this is how the components handler functions, can be passed to child 
  * components and how redux actions are hooked up to react components
**/
function mapDispatchToProps(dispatch){
	return({
		getCreateUser: (userName, userPass, userPass2, userEmail) =>
      {dispatch(createProfileAction(userName,
                                    userPass,
                                    userPass2,
                                    userEmail));},
		getisLoad: (isLoadingStatus) =>{dispatch(isLoadingAction(isLoadingStatus));},
		getUpdateFailed: (message)=>{dispatch(createFailedAction(message));},
		getOpenDialog: () =>{dispatch(dialogOpenCreateAction())},
		getCloseDialog: () =>{dispatch(dialogCloseCreateAction())},
		getResetDialog: () =>{dispatch(resetDialogAction())}

	})
}

const connectedCreateProfile = connect(mapStateToProps,
                                       mapDispatchToProps)(CreateUserProfile);
export {connectedCreateProfile as ProfileOps};


