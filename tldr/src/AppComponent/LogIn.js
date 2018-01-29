import React from 'react'
import {  BrowserRouter as Router,Switch, Route, Link } from 'react-router-dom'
import SignUp from './SignUp'

class LogIn extends React.Component {
  render() {
    return(
      <form>
        <div>
         <label>Username</label>
         <input type="text" placeHolder="Email" required></input>
        </div>

        <div>
         <label>Password</label>
         <input type="Password" placeHolder="Password" required></input>
        </div>

        <button>Log in</button>

        <Router>
          <div>
            <a><Link to="/SignUp">Dont have an account? Please Sign up</Link></a>

            <Switch>
          		<Route exact path="/SignUp" component={SignUp} />
          	</Switch>

          </div>
        </Router>
      </form>
    );
  }
}

export default LogIn;
