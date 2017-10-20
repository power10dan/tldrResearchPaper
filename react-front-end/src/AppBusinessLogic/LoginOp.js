import React from 'react';
import LoginComp from '../AppComponents/LoginComp.js';
import bcrypt from 'bcryptjs';
import ErrSnack from '../AppComponents/ErrDialog.js';

class LoginOperations extends React.Component{
	//salt = bcrypt.getSaltSync(24);
	constructor(props){
		super(props);
		this.state = {
			notLogState: null,
			newUserName: " ",
			newUserEmail: " ",
			newUserPassword: " ",
			errorMess: " ",

			userName: " ",
			userEmail: " ",
			userPassword: " ",

			errorLoginStateEmail: false,
			errorLoginStatePassword: false,
			errorLoginStateName: false,

			errorCreateStateEmail: false,
			errorCreateStatePassword1: false,
			errorCreateStatePassword2: false,
			errorCreateStateName: false,
		}
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

	//login Get methods.
	userEmailGet = (userEmail) => {
		this.setState({userEmail : userEmail.target.value});
	}
	userPasswordGet = (userPass) => {
		this.setState({userPassword : userPass.target.value}); 
	}
	userNameGet = (userName) => {
		this.setState({userName : userName.target.value});
	}

	//storeHash = (err, pass) =>{
	//	this.setState({userPassword: pass});
	//}


	// button for submitting to create user account
	userLogin = () =>{
		if( /^\s*$/.test(this.state.userEmail)){
			this.state.errorLoginStateEmail = true;
		}  else {
			this.setState({errorLoginStateEmail: false})
		}

		if ( /^\s*$/.test(this.state.userPassword) ){
			this.state.errorLoginStatePassword = true
		} else {
			this.setState({errorLoginStatePassword: false})
		}

		if( /^\s*$/.test(this.state.userName)){
			this.setState({errorLoginStateName: true});
		} else{
			this.setState({errorLoginStateName: false}, ()=> {
				if(this.state.errorLoginStateName === false 
					  && this.state.errorLoginStatePassword === false 
					  && this.state.errorLoginStateEmail === false){
					this.APICall_login();
				}
			})
		}
		/*	
			 bcrypt.hash(this.state.userPass, 10, this.storeHash);
			 this.createUserCredentials(this.state.userAccount, this.state.userPass);
		}	*/
	}


	// button for submitting to create user account
	createNewUser = () =>{
		if( /^\s*$/.test(this.state.newUserEmail)){
			this.state.errorCreateStateEmail = true;
		}  else {
			this.setState({errorCreateStateEmail: false})
		}

		if ( /^\s*$/.test(this.state.newUserPassword) ){
			this.state.errorCreateStatePassword1 = true
			this.state.errorCreateStatePassword2 = true
		} else {
			this.setState({errorCreateStatePassword: false})
		}

		if( /^\s*$/.test(this.state.newUserName)){
			this.setState({errorCreateStateName: true});
		} else{
			this.setState({errorCreateStateName: false}, ()=> {
				if(this.state.errorCreateStateName === false 
					  && this.state.errorCreateStatePassword === false 
					  && this.state.errorCreateStateEmail === false){
					this.APICall_createUser();
				}
			})
		}
	}


	APICall_createUser = () =>{
		// send the user name and password to the 
		// db
		var jsonData = {username: this.state.newUserName,
				account_emailaddress: this.state.newUserEmail,
				password1: this.state.newUserPassword,
				password2: this.state.newUserPassword
				}; 
		var url = "http://127.0.0.1:8000/rest-auth/registration/";
		fetch(url, {
			method: 'post',
			body: JSON.stringify(jsonData),
			dataType: "json",
			mode: "cors",
			headers: {
        	    'Content-Type': 'application/json',
        	}
		}).then((response) => {
			var resp = [response.json(), response.status];
			return resp
		}).then((data)=>{
			if(data[1] == 400){
				this.setState({notLogState: true})
			}

			if(data[1] == 200){
				this.setState({notLogState: false});
			}

			console.log(data)
		}).catch((err)=>{
			console.log(err)
		});
	}
 
	APICall_login = (userID, userPass) =>{
		var jsonData = {username: this.state.userName,
				account_emailaddress: this.state.userEmail,
				password: this.state.userPassword };
		var url = "http://127.0.0.1:8000/rest-auth/login/";
		var initParams = {  method: 'post', 
				    body: JSON.stringify(jsonData),
		 		    mode: 'cors',
				    headers: {'Content-Type': 'application/json'},
		  		  };
	
		fetch(url, initParams).then((response) =>{
			var resp = [response.json(), response.status]
			return resp;
			//var hash = bcrypt.hash(userPass, this.salt)
			//if(bcrypt.compareSync(userPass, response.passWord) == false){
			//	console.log("Can't log in here");
			//	this.setState(this.isLogin.isLogState: false);
			//} else{
			//	console.log("Login successful");
			//	this.setState(this.isLogin.isLogState: true);
			//}
		}).then((data) =>{
			if(data[1] == 400){
				this.setState({notLogState: true})
			}


			if(data[1] == 200){
				this.setState({notLogState: false})
			}

		}).catch((err)=>{
			console.log(err);
		});	
	}

	render(){
		let state = null
		if(this.state.notLogState == true){
			state = 
				<div>
					<ErrSnack openDialog ={this.state.notLogState} 
					          message={"Wrong Credentials, please try again"} />
					<LoginComp
				      		//props for Create User Interface
					      createPasswordGet = {this.newUserPasswordGet}
					      createUserNameGet = {this.newUserNameGet}
					      createEmailGet = {this.newUserEmailGet}
					      createAccountSubmitHandler = {this.createNewUser}
					      
					      //props for Login Interface
					      loginPasswordGet = {this.userPasswordGet}
					      loginNameGet = {this.userNameGet}
					      loginEmailGet = {this.userEmailGet}
					      loginSubmitHandler = {this.userLogin}

					      isErrorEmail = {this.state.errorLoginStateEmail}
					      isErrorPassword = {this.state.errorLoginStatePassword}
					      isErrorName = {this.state.errorLoginStateName}

					      isCreateErrorEmail = {this.state.errorCreateStateEmail}
					      isCreateErrorPassword1 = {this.state.errorCreateStatePassword1}
					      isCreateErrorPassword2 = {this.state.errorCreateStatePassword2}
					      isCreateErrorName = {this.state.errorCreateStateName}
					/>
				</div>
			
		} 

		if(this.state.notLogState == false){
			state = <ErrSnack openDialog ={true} 
			                  message={"You have successfully Logged in"} 
			         />
		}

		if(this.state.notLogState == null){
			state = <LoginComp
				      //props for Create User Interface
				      createPasswordGet = {this.newUserPasswordGet}
				      createUserNameGet = {this.newUserNameGet}
				      createEmailGet = {this.newUserEmailGet}
				      createAccountSubmitHandler = {this.createNewUser}
				      
				      //props for Login Interface
				      loginPasswordGet = {this.userPasswordGet}
				      loginNameGet = {this.userNameGet}
				      loginEmailGet = {this.userEmailGet}
				      loginSubmitHandler = {this.userLogin}

				      isErrorEmail = {this.state.errorLoginStateEmail}
				      isErrorPassword = {this.state.errorLoginStatePassword}
				      isErrorName = {this.state.errorLoginStateName}

				      isCreateErrorEmail = {this.state.errorCreateStateEmail}
				      isCreateErrorPassword1 = {this.state.errorCreateStatePassword1}
				      isCreateErrorPassword2 = {this.state.errorCreateStatePassword2}
				      isCreateErrorName = {this.state.errorCreateStateName}
				/>
		}

		return(
			<div>
				{state}
			</div>

		);	
	}

}

export default LoginOperations;