import React from 'react'
import SignUp from './SignUp'
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { AppStateActionCreator } from '../Redux/Actions/ActionCreators.js';
import {CURR_PAGE } from '../Redux/Actions/ActionConstants.js';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import red from 'material-ui/colors/red';



export const loginstyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 425,
    width: 400,
  },

  control: {
    padding: theme.spacing.unit * 2,
  },
});


class LogInPanel extends React.Component {

  state={
    // OSU_Id:"",
    // Password:"",
    disabled: true,
    Token:""
  }

  signup_click = (event) => {
    let payload=2
    this.props.updatePage(payload);
  }

  successful_login = e => {
    if (
      //this.state.OSU_Id.length != 0 && this.state.Password != 0 &&
      this.state.disabled==true){e.preventDefault();
    console.log(JSON.parse(JSON.stringify(this.state)));
    window.open("https://prometheus.eecs.oregonstate.edu/token/generate?asid=321398945712335&then=","_blank")
    this.setState( {disabled: !this.state.disabled} )
  }else if (
    //this.state.OSU_Id.length != 0 && this.state.Password.length != 0 && 
    this.state.Token.length!=0){
    let payload=3;
    this.props.updatePage(payload)
    console.log(JSON.parse(JSON.stringify(this.state)));
  }

  }

  render() {

      const { classes } = this.props;

      return(
        <Grid>
          <Grid item xs={12}>
            <Grid container className={classes.demo} justify="center" >
              {[0].map(value => (
                <Grid key={value} item>

                  <Paper className={classes.paper}>
                    <form class="form-group" >
                      <div className={classes.root}>
                          <AppBar position="static" title={<span style={loginstyles.title}>Title</span>} titleStyle={loginstyles.title_color} >
                            <Toolbar>
                              <Typography type="Sign_Up"  color="inherit">
                                    <h1>Login</h1>
                              </Typography>
                          </Toolbar>
                        </AppBar>
                    </div>
                      <br></br>
                    <br></br>

                    {/*<div>
                       <TextField value={this.state.OSU_Id}
                       placeHolder="Enter OSU ID" label="OSU ID"
                       onChange={e => this.setState({OSU_Id: (e.target.value)})} required/>
                    </div>

                    <div>
                       <TextField value={this.state.Password}
                         type="Password"
                         placeHolder="Password"
                          label="Password"
                          onChange={e => this.setState({Password: e.target.value})} required/>
                    </div> */}

                      <div>
                      <TextField value={this.state.Token}
                        type="Token"
                        placeHolder="Token"
                         label="Token"
                         disabled={(this.state.disabled)? "disabled" : false}
                         onChange={e => this.setState({Token: e.target.value})}/>

                    </div>

                      <br></br>
                        <br></br>
                      <Button raised color="primary" onClick={(e) => this.successful_login(e)}> Login</Button>

                      <div>
                      <br></br>
                        <br></br>
                      {/* <a href="#" onClick={this.signup_click}>Dont have an account? Please Sign up </a> */}
                      </div>
                    </form>
                </Paper>

              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}



const mapDispatchToProps = (dispatch)=>{
	return ({
		updatePage: (payLoad)=>{dispatch(AppStateActionCreator(CURR_PAGE, payLoad));},
	});
}

let LogIn = connect(null, mapDispatchToProps)(LogInPanel);
export default withStyles(loginstyles)(LogIn);
