import React from 'react'

class SignUpForm extends React.Component {
  render() {
    return(
      <form>

       <h1> Sign Up Folks !</h1>
       <div>
        <label>Name</label>
        <input type="text"></input>
       </div>
       <div>
        <label>Email </label>
        <input type="text"></input>
       </div>
       <div>
        <label>Password</label>
        <input type="Password"></input>
       </div>
       <button>SignUp</button>
      </form>
    );
  }
}

export default SignUpForm;
