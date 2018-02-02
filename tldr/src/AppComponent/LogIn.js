import React from 'react'
import {  BrowserRouter as Router,Switch, Route, Link } from 'react-router-dom'
import SignUp from './SignUp'
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { AppStateActionCreator } from '../Redux/Actions/ActionCreators.js';
import {CURR_PAGE, PREF_CONFERENCE } from '../Redux/Actions/ActionConstants.js';
import { connect } from 'react-redux';

class LogInPanel extends React.Component {


  signup_click = (event) => {
    let payload=2
    this.props.updatePage(payload);
  }

  successful_login = (event) => {
    let payload=3
    this.props.updatePage(payload);
  }

  render() {
    return(
      <form>
        <div>
         <TextField placeHolder="Email" label="User Name" required/>
        </div>

        <div>

         <TextField placeHolder="Password" label="Password" required/>
        </div>
        <br></br>

        <Button raised color="primary" onClick={this.successful_login}> Login</Button>

        <div>
        <br></br>
          <a href="#" onClick={this.signup_click}>Dont have an account? Please Sign up </a>
        </div>
      </form>
    );
  }
}


const mapDispatchToProps = (dispatch)=>{
	return ({
		updatePage: (payLoad)=>{dispatch(AppStateActionCreator(CURR_PAGE, payLoad));},
	});
}

let LogIn = connect(null, mapDispatchToProps)(LogInPanel);
export default LogIn;
