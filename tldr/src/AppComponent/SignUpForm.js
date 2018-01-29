import React from 'react'


class SignUpForm extends React.Component {

  state={
    FirstName:"",
    LastName:"",
    UserName:"",
    Email:"",
    Password:""
  }

  Submit = e =>{
    e.preventDefault();
    console.log(JSON.parse(JSON.stringify(this.state)));
  }

  render() {
    return(
      <form>
       <h1> Sign Up Folks !</h1>
       <div>
        <label> First Name</label>
        <input type="text"
        placeHolder="First Name"
        value={this.state.FirstName}
        onChange={e => this.setState({FirstName: e.target.value}) }
        required></input>
       </div>
       <div>
        <label>Last Name</label>
        <input type="text" value={this.state.LastName}
        placeHolder="Last Name"
        onChange={e => this.setState({LastName: e.target.value}) }
        required></input>
       </div>
       <div>
        <label>User Name</label>
        <input type="text" value={this.state.UserName}
        onChange={e => this.setState({UserName: e.target.value}) }
        placeHolder="User Name"
        required></input>
       </div>
       <div>
        <label>Email </label>
        <input type="text"
        value={this.state.Email}
        placeHolder="Email"
        onChange={e => this.setState({Email: e.target.value}) }required></input>
       </div>
       <div>
        <label>Password</label>
        <input type="Password"
        placeHolder="Password"
        value={this.state.Password}
        onChange = { e => this.setState({Password : e.target.value})}
        required></input>
       </div>
       <button onClick={(e) => this.Submit(e)}>SignUp</button>
       <br></br>
       <a href="">Already have an account? Log In</a>
      </form>
    );
  }
}

export default SignUpForm;
