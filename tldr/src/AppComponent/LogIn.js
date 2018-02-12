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
<<<<<<< HEAD
  constructor(props){
     super(props);
     this.state = {
        OSU_Id:"",
        Password:"",
      }
=======

  state={
    // OSU_Id:"",
    // Password:"",
    disabled: true,
    Token:""
>>>>>>> FE_login_signup
  }
 
  signup_click = (event) => {
    let payload=2
    this.props.updatePage(payload);
  }

  successful_login = e => {
<<<<<<< HEAD
    if (this.state.OSU_Id.length != 0 && this.state.Password != 0){
        e.preventDefault();
        let payload=3
        this.props.updatePage(payload);
    }
=======
    if (
      //this.state.OSU_Id.length != 0 && this.state.Password != 0 &&
      this.state.disabled==true){e.preventDefault();
    console.log(JSON.parse(JSON.stringify(this.state)));
    window.open("https://prometheus.eecs.oregonstate.edu/token/generate?asid=321398945712335&then=","_blank")
    this.setState( {disabled: !this.state.disabled} )
  }else if (
    //this.state.OSU_Id.length != 0 && this.state.Password.length != 0 &&
    this.state.Token.length==12){
    let payload=3;
    this.props.updatePage(payload)
    console.log(JSON.parse(JSON.stringify(this.state)));
  }

>>>>>>> FE_login_signup
  }

  render() {
      const { classes } = this.props;
<<<<<<< HEAD
      //const { spacing } = this.state;
=======

>>>>>>> FE_login_signup
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
                              <Typography type="Log_In"  color="inherit">
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
                         label="Add 12 digit Token"
                         disabled={(this.state.disabled)? "disabled" : false}
                         onChange={e => this.setState({Token: e.target.value})}/>

                    </div>

                      <br></br>
                        <br></br>
                      <Button raised color="primary" onClick={(e) => this.successful_login(e)}>Login</Button>

                      <div>
                      <br></br>
                        <br></br>
                      {/* <a href="#" onClick={this.signup_click}>Dont have an account? Please Sign up </a> */}

                      </div>
                    </form>
                </Paper>
                  <h4>* PLease fill the survey by pressing the Login button <br></br>if token textfield is disabled</h4>
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
