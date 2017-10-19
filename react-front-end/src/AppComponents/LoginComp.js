import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import CreateNewProfileComp from '../AppComponents/CreateProfile.js';

const styles = theme => ({
    card: {
        width:'50%',
        height:'150px',
        marginTop: "55px",
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
    	width:'50%',
      height:'220px',
      marginTop: "0px",
      padding: "2px",
      marginLeft: "425px",
    	color: "#FFFFFF",
      position: "center",
    },

    title: {
    	fontSize: 45,  
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

const SimpleCard = (props) => {
  const classes = props.classes;
  return (
    <div className={classes.containerDiv}>
      <Card className={classes.card}>
        <CardContent>
           		<Typography type="body1" className={classes.title}>
		           " Welcome! "
		        </Typography>
        </CardContent>
      </Card>
      <Card className={classes.inputCard} elevation={1}>
	        <CardContent>
  	      		<TextField
  			          id="account"
  			          label="User Name"
  			          className={classes.textField}
  			          type="account"
  			          margin="normal"
                  onChange={props.userNameGet}
                  required
                  error = {props.isErrorAcc}
  		    	   >
		</TextField>

		<TextField
			id="account"
			label="Email"
			className={classes.textField}
			type="account"
			margin="normal"
			onChange={props.getAcc}
			required
			error={props.isErrorAcc}
				>
               </TextField>

	          	 <TextField
  			          id="password"
  			          label="Password"
  			          className={classes.textFieldPass}
  			          type="password"
  			          margin="normal"
                  onChange={props.passWordHand}
                  required
                  error = {props.isErrorPass}
		    	     >
               </TextField>
		    	<CardActions className={classes.cardActionContainer}>
			          <Button dense color="primary" onClick={props.loginHandler}>
			            Login 
			          </Button>
			          <Button dense color="primary">
			            Forgot Password / Account 
			          </Button>
  			        <CreateNewProfileComp 
                    nameGetter = {props.userNameGet}
                    passWordGetter = {props.passWordHand}
                    accountGetter = {props.getAcc}
                    submitHandler = {props.submitHandler}
                />
		        </CardActions>
	        </CardContent>
        </Card>
    </div>
    
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
