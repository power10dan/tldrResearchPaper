import React from 'react'
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




export const sigupstyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 440,
    width: 400,
  },

  control: {
    padding: theme.spacing.unit * 2,
  },
});


class SignUpFormPanel extends React.Component {

  goto_Login_page = (event)=>{
    let payload=0;
    this.props.updatePage(payload)
  }
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
    this.goto_Login_page(e);
  }

  render() {

    const { classes } = this.props;
    const { spacing } = this.state;

    return(
    <Grid>
      <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
            {[0].map(value => (
              <Grid key={value} item>
                <Paper className={classes.paper} >


                <form class="form-group" >

                <div className={classes.root}>
                  <AppBar position="static" >
                    <Toolbar>
                      <Typography type="Sign_Up"  color="inherit">
                        <h1>Sign Up</h1>
                      </Typography>
                    </Toolbar>
                  </AppBar>
                </div>

                <br></br>
                   <div>
                    <TextField
                    label="First Name"
                    value={this.state.FirstName}
                    onChange={e => this.setState({FirstName: e.target.value})} />
                   </div>
                   <div>

                    <TextField value={this.state.LastName}
                    label="Last Name"
                    onChange={e => this.setState({LastName: e.target.value})} />
                   </div>
                   <div>
                    <TextField value={this.state.UserName}
                    onChange={e => this.setState({UserName: e.target.value}) }
                    label="User Name" />
                   </div>
                   <div>

                    <TextField
                    value={this.state.Email}
                    label="Email"
                    onChange={e => this.setState({Email: e.target.value}) } />
                   </div>
                   <div>

                    <TextField type="Password"
                    label="Password"
                    value={this.state.Password}
                    onChange = { e => this.setState({Password : e.target.value})}
                    />
                   </div>
                   <br></br>
                   <Button raised color="primary" onClick={(e) => this.Submit(e)}>SignUp</Button>
                   <br></br>
                   <br></br>
                   <a href="" onClick={this.goto_Login_page}>Already have an account? Log In</a>
                </form>
                  <br></br>
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

let SignUpForm = connect(null, mapDispatchToProps)(SignUpFormPanel);

export default withStyles(sigupstyles)(SignUpForm);
