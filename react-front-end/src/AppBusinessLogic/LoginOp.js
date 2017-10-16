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
			userPass: " ",
			errorStateAcc: false,
			errorStatePass: false
		}
	}

	saveUserAcc = (userAcc) =>{
		this.setState({userAccount: userAcc.target.value});
	}

	storeHash = (err, pass) =>{
		this.setState({userPass: pass});
	}

	saveUserPass = (passWord) => {
		this.setState({userPass: passWord.target.value});
	}
	submitButton = () =>{
		if(!this.state.userAccount || /^\s*$/.test(this.state.userAccount)){
			this.setState({errorStateAcc: true});
		}  else {
			this.setState({errorStateAcc: false})
		}

		if (!this.state.userPass || /^\s*$/.test(this.state.userPass) ){
			this.setState({errorStatePass: true})
		} else {
			this.setState({errorStatePass: false})
		}
	
		if(this.state.errorStateAcc == false && this.state.errorStatePass == false){
			 bcrypt.hash(this.state.userPass, 10, this.storeHash);
			 this.createUserCredentials(this.state.userAccount, this.state.userPass);
		}	
	}


	createUserCredentials = (userName, userPassword) =>{
		// send the user name and password to the 
		// db 
		var url = "https://127.0.0.1:8000/api/createCred";
		fetch(url, {
			method: 'post',
			userAcc: userName ,
			userPass: userPassword,
			dataType: 'json',
			mode: 'no-cors',
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

	logIntoSystem = (userID, userPass) =>{
		var url = "https://127.0.0.1/api/login";
		var initParams = {  method: 'get', 
		  				    dataType: 'json',
		  				    mode: 'no-cors',
		  				    headers: { 
		  				    	'Content-Type': 'application/json'
		  				    },
		  				 };
		fetch(url, initParams).then((response) =>{
			var hash = bcrypt.hash(userPass, this.salt)
			if(bcrypt.compareSync(userPass, response.passWord) == false){
				console.log("Can't log in here");
				this.setState(this.isLogin.isLogState: false);
			} else{
				console.log("Login successful");
				this.setState(this.isLogin.isLogState: true);
			}
		}).catch((err)=>{
			console.log(err);
		});	
		
	}

	render(){
		return(
			<LoginComp 
			      passWordHand = {this.saveUserPass}
			      getAcc = {this.saveUserAcc}
			      submitHandler = {this.submitButton}
			      isErrorAcc = {this.state.errorStateAcc}
			      isErrorPass = {this.state.errorStatePass}
			/>
		);
	}

}

export default LoginOperations;