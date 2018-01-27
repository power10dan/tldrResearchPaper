import React from 'react'

class LogIn extends React.Component {
  abc(){
    
  }
  render() {
    return(
      <form>
        <div>
         <label>Username</label>
         <input type="text"></input>
        </div>

        <div>
         <label>Password</label>
         <input type="Password"></input>
        </div>

        <button>Log in</button>
        <div>

          <a href="" onClick="abc()">Dont have an account? Please Sign up</a>
        </div>
      </form>
    );
  }
}

export default LogIn;
