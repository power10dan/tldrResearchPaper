import React from 'react';
import LoginComp from '../AppComponents/LoginComp.js';
import bcrypt from 'bcryptjs';

class LoginOperations extends React.Component{
	//salt = bcrypt.getSaltSync(24);
	constructor(props){
		super(props);
		this.state = {
			isLogState: false,
			userAccount: " ",
			userPassword: " ",
			userPass: " ",
			userPass2: " ",
			userName: " ",
			errorStateAcc: false,
			errorStatePass: false,
			errorStateName: false,
		}
	}

	saveUserAcc = (userAcc) =>{
		this.setState({userAccount: userAcc.target.value});
	}

	storeHash = (err, pass) =>{
		this.setState({userPassword: pass});
	}

	saveUserName = (userName) =>{
		this.setState({userName: userName.target.value});
		//console.log(userName);
	}

	saveUserPass = (passWord) => {
		console.log(passWord.target.value);
		this.setState({userPassword: passWord.target.value});
	}

	// button for submitting to create user account
	submitButtonCreateCred = () =>{
		if( /^\s*$/.test(this.state.userAccount)){
			this.state.errorStateAcc = true;
		}  else {
			//his.state.errorStateAcc = false;
			this.setState({errorStateAcc: false})
		}

		if ( /^\s*$/.test(this.state.userPass) ){
			this.state.errorStatePass = true
			//this.setState({errorStatePass: true})
		} else {
			//this.state.errorStatePass = false;
			this.setState({errorStatePass: false})
		}

		if( /^\s*$/.test(this.state.userPass)){
			this.setState({errorStateName: true});
		} else{
			//this.state.errorStateName = false;
			this.setState({errorStateName: false}, ()=> {
				if(this.state.errorStateName === false 
					  && this.state.errorStatePass === false 
					  && this.state.errorStateAcc === false){
					console.log("hi ")
				}
			})
		}

		/*if(this.state.errorStateName === false 
			  && this.state.errorStatePass === false 
			  && this.state.errorStateAcc === false){
			console.log("hi ")
		}*/

		
		/*if(this.state.errorStateAcc == false 
		    && this.state.errorStatePass == false
		    && this.state.errorStateName == false){
			
			 bcrypt.hash(this.state.userPass, 10, this.storeHash);
			 this.createUserCredentials(this.state.userAccount, this.state.userPass);
		}	*/
	}


	createUserCredentials = (userName, userPassword,userAccount) =>{
		// send the user name and password to the 
		// db
		console.log(this.state.userName)
		console.log(this.state.userAccount)
		console.log(this.state.userPassword)
		var jsonData = {username: this.state.userName,
				account_emailaddress: this.state.userAccount,
				password1: this.state.userPass,
				password2: this.state.userPass
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
			return response.json();
		}).then((data)=>{
			console.log("data")
		}).catch((err)=>{
			console.log(err)
		});
	}

	// button to login  
	logIntoSystem = (userID, userPass) =>{
		var jsonData = {username: this.state.userName,
				account_emailaddress: this.state.userAccount,
				password: this.state.userPassword
				};
		var url = "http://127.0.0.1:8000/rest-auth/login/";
		var initParams = {  method: 'post', 
				    body: JSON.stringify(jsonData),
		  		    mode: 'cors',
				    headers: {'Content-Type': 'application/json'},
		  		  };

		fetch(url, initParams).then((response) =>{
			return response.json();
			//var hash = bcrypt.hash(userPass, this.salt)
			//if(bcrypt.compareSync(userPass, response.passWord) == false){
			//	console.log("Can't log in here");
			//	this.setState(this.isLogin.isLogState: false);
			//} else{
			//	console.log("Login successful");
			//	this.setState(this.isLogin.isLogState: true);
			//}
		}).catch((err)=>{
			console.log(err);
		});	
	}

	render(){
		return(
			<LoginComp 
			      passWordHand = {this.saveUserPass}
			      userNameGet = {this.saveUserName}
			      getAcc = {this.saveUserAcc}
			      submitHandler = {this.createUserCredentials}
			      loginHandler = {this.logIntoSystem}
			      isErrorAcc = {this.state.errorStateAcc}
			      isErrorPass = {this.state.errorStatePass}
			/>
		);
	}

}

export default LoginOperations;
