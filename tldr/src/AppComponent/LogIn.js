import React from 'react'
import {  BrowserRouter as Router,Switch, Route, Link } from 'react-router-dom'
import SignUp from './SignUp'
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

class LogIn extends React.Component {

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

        <Button raised color="primary"> Login</Button>

        <div>
        <br></br>
          <a href="">Dont have an account? Please Sign up </a>
        </div>

      </form>
    );
  }
}

export default LogIn;
