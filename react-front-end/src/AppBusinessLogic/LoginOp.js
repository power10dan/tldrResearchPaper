import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginComp from '../AppComponents/LoginComp.js';
/* import bcrypt from 'bcryptjs';*/
import ErrSnack from '../AppComponents/ErrDialog.js';
import { login } from '../ReduxFolder/Actions/actions.js'

class LoginOperations extends React.Component{
	//salt = bcrypt.getSaltSync(24);
	constructor(props){
		super(props);

      /* const { dispatch } = this.props;*/
		this.state = {
			  /* notLogState: null,
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
			     errorCreateStateName: false,*/
        username: "",
        password: "",
        submitted: false
		};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
	}

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;

        if (username && password) {
            dispatch(login(username, password));
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
        this.setState({errorLoginStateEmail: true})
		} else {
			this.setState({errorLoginStateEmail: false})
		}

		if ( /^\s*$/.test(this.state.userPassword)){
        this.setState({errorLoginStatePassword: true})
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
					this.setState({userName: " "})
					this.setState({userPassword: " "})
					this.setState({userEmail: " "})
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
        this.setState({errorCreateStateEmail: true});
			  /* this.state.errorCreateStateEmail = true;*/
		}  else {
			this.setState({errorCreateStateEmail: false})
		}

		if ( /^\s*$/.test(this.state.newUserPassword) ) {
        this.setState({errorCreateStatePassword1: true});
        this.setState({errorCreateStatePassword2: true});
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
					this.setState({newUserEmail: " "})
					this.setState({newUserPassword: " "})
					this.setState({newUserName: " "})
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
			if(data[1] === 400){
				this.setState({notLogState: true})
			}

			if(data[1] === 200){
				this.setState({notLogState: false});
			}

			console.log(data)
		}).catch((err)=>{
			console.log(err)
		});
	}

	APICall_login = (userID, userPass) =>{
      /* const { dispatch } = this.props;
       * dispatch(login( jsonData.username, jsonData.password));*/
		  /* var url = "http://127.0.0.1:8000/rest-auth/login/";
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
			   if(data[1] === 400){
				 this.setState({notLogState: true})
			   }


			   if(data[1] === 200){
				 this.setState({notLogState: false})
			   }

		     }).catch((err)=>{
			   console.log(err);
		     });*/
	}

	render(){
		  /* let state = null
		     if(this.state.notLogState === true){
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

		     if(this.state.notLogState === false){
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
       */
      const { loggingIn } = this.props;
      const { username, password, submitted } = this.state;
		  return(
          <div className="col-md-6 col-md-offset-3">
              <h2>Login</h2>
              <form name="form" onSubmit={this.handleSubmit}>
                  <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                      <label htmlFor="username">Username</label>
                      <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                      {submitted && !username &&
                       <div className="help-block">Username is required</div>
                      }
                  </div>
          <div className={'form-group'
                        + (submitted && !password ? ' has-error' : '')}>
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                      {submitted && !password &&
                       <div className="help-block">Password is required</div>
                      }
                  </div>
                  <div className="form-group">
                      <button className="btn btn-primary">Login</button>
                      { loggingIn && <img src= "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      }
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLogin = connect(mapStateToProps)(LoginOperations);
export { connectedLogin as LoginOps };
