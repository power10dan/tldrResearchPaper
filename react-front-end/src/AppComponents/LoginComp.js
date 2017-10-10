import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';


const styles = theme => ({
  card: {
      width:'50%',
      height:'180px',
      marginTop: "55px",
      padding: "2px",
      marginLeft: "475px",
      background: "#5C6BC0",
      position: "center",
  },

  textField: {
  	marginTop: "-5px",
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
    height:'180px',
    marginTop: "0px",
    padding: "2px",
    marginLeft: "475px",
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
  }
});

const SimpleCard = (props) => {
  const classes = props.classes;
 
  return (
    <div className={classes.containerDiv}>
      <Card className={classes.card}>
        <CardContent>
           		<Typography type="body1" className={classes.title}>
		           " Hi. "
		        </Typography>
        </CardContent>
      </Card>
      <Card className={classes.inputCard} elevation={1}>
	        <CardContent>
  	      		<TextField
  			          id="account"
  			          label="ID"
  			          className={classes.textField}
  			          type="account"
  			          margin="normal"
  		    	   />

	          	 <TextField
  			          id="password"
  			          label="Password"
  			          className={classes.textFieldPass}
  			          type="password"
  			          margin="normal"
		    	     />
		    	<CardActions>
			          <Button dense color="primary">
			            Login 
			          </Button>
			          <Button dense color="primary">
			            Forgot Password / Account 
			          </Button>
			          <Button dense color="primary">
			            Create Account
			          </Button>

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