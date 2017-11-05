import React from 'react';
import { connect } from 'react-redux';
import bcrypt from 'bcryptjs';
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
      isRegistered: false,
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
    	let userPass2 = this.state.newUserPassword2;

        console.log("USER: ", userPass, userPass2);
    	if(userName === ""){
    		this.props.updateFailed("User Name Field is Empty");
    		this.props.openDialog();

        // set dialog close after two seconds
    		setTimeout(()=>{this.props.closeDialog()}, 2000);

    	} else if(userEmail === ""){
    		this.props.updateFailed("Please Input User Email");
    		this.props.openDialog();
    		setTimeout(()=>{this.props.closeDialog()}, 2000); 

    	} else if(userPass === ""){
    		this.props.updateFailed("Please Input User Password");
    		this.props.openDialog();
    		setTimeout(()=>{this.props.closeDialog()}, 2000);

    	} else if (userPass2 === ""){
    		  this.props.updateFailed("Second Password Required");
    		  this.props.openDialog();
    		  setTimeout(()=>{this.props.closeDialog()}, 2000);

      } else if (userPass.localeCompare(userPass2) !== 0){
    		  this.props.updateFailed("Passwords do not match!");
    		  this.props.openDialog();
    		  setTimeout(()=>{this.props.closeDialog()}, 2000);

      } else {
    		this.props.isLoad(true);
          console.log('BEFORE', this.state)

          // only send the first password twice so the user is created
          // if we send both then they'll never match because of hash
		      this.setState({newUserPassword: userPass}, () => {
              bcrypt.hash(this.state.newUserPassword, 10, this.storeHash);
          });

    		  this.props.createUser(userName, this.newUserPassword, this.newUserPassword, userEmail);
          console.log('AFTER', this.state)
    		
        // then something happened at the login
    		  /* if(this.state.isRegistered === false){
    			   this.props.updateFailed("Failed to Register, please try again");
	    		   this.props.openDialog();
    		     }

           * // then login was successful
    		     if(this.state.isRegistered === true){
    			   this.props.openDialog();
    		     }*/

    			/* setTimeout(()=>{this.props.closeDialog()}, 2000);*/
          this.props.closeDialog();
    	}

        this.setState({newUserEmail: " "})
		    this.setState({newUserPassword: " "})
		    this.setState({newUserPassword2: " "})
		    this.setState({newUserName: " "})
    }

    //create user Get methods.
	newUserEmailGet = (userEmail) => {
		this.setState({newUserEmail : userEmail.target.value});
	}

     
  // this repetition is screaming for a higher ordered function
  storeHash = (err, hash) => {this.setState({userPass: hash});}

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


