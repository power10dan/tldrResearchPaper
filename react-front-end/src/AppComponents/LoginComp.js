import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { ProfileOps } from '../AppBusinessLogic/CreateUserProfile.js';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
//import { ProfileOps } from '../AppComponents/CreateProfile.js';

const styles = theme => ({
    card: {
        width:'40%',
        height:'160px',
        marginTop: "125px",
        padding: "2px",
        marginLeft: "425px",
        background: "#5C6BC0",
        position: "center",
    },

    textField: {
    	marginTop: "-8px",
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 350,
    },

    textFieldPass: {
    	marginTop: "2px",
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 350,
    },

    inputCard:{
    	width:'40%',
      height:'200px',
      marginTop: "0px",
      padding: "2px",
      marginLeft: "425px",
    	color: "#FFFFFF",
      position: "center",
    },

    title: {
    	fontSize: 55,
    	marginTop: 60,
    	color: "#FFFFFF",
    },

    containerDiv:{
      position: "absolute",
    },

    cardActionContainer: {
      marginLeft: "30px"
    }
});

const LoginCard = (props) => {
  const classes = props.classes;
  const callbacks = props.package;
  return (
      <div className={classes.containerDiv}>
        <Card className={classes.card}>
            <CardContent>
               		<Typography type="body1" className={classes.title}>
    		           " Hi. "
    		        </Typography>
            </CardContent>
        </Card>
        <Card className={classes.inputCard} elevation={1} >
  	        <CardContent>
      	      		<TextField
                      value= {props.name}
      			          id="account"
      			          label="User Name"
      			          className={classes.textField}
      			          type="account"
      			          margin="normal"
                      onChange={callbacks.GetUserName}
                      required
                    >
    		          </TextField>

        	         <TextField
                         value={props.pass}
          			         id="password"
          			         label="Password"
          			         className={classes.textFieldPass}
          			         type="password"
          			         margin="normal"
                         onChange={callbacks.GetPassword}
                         required >
                   </TextField>
        		    	<CardActions className={classes.cardActionContainer}>
        			          <Button dense color="primary" onClick={callbacks.LoginSubmit}>
        			            Login
        			          </Button>
                        <ProfileOps />
        			         
        		      </CardActions>
  	        </CardContent> 
          </Card>
      </div>
  );
}

LoginCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginCard);
