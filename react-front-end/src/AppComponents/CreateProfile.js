import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle
} from 'material-ui/Dialog';

import { withStyles } from 'material-ui/styles';

const styles = theme =>({
	titleStyle: {
		backgroundColor:"#3F51B5",
	    paddingLeft: "135px",
	    height: "70px",
	    paddingBottom: "15px",
	    marginBottom: '20px'
	},

	textField: {
	  	marginTop: "25px",

  	},

  	title: {
    	fontSize: 45,
    	marginTop: 20,
    	color: "#FFFFFF",
    	paddingleft: 30
    },
});


const CreateNewProfileComp = (props) =>{
	const callbacks = props.callBacks;
	console.log(callbacks)
	return(
			<div>
				<Button dense color="primary" onClick = {callbacks.HandleClickOpenDialog} >
		  			 Create Account
		  		</Button>

				<Dialog open ={props.isOpen} onRequestClose={callbacks.HandleClickCloseDialog}>
					<DialogTitle className={ props.classes.titleStyle}>
						<Typography className={ props.classes.title} >
								Create Account
						</Typography>
					</DialogTitle>
					
					<DialogContent>
						<TextField
								autoFocus
								margin="dense"
								id="name"
								label="User Name"
								fullWidth
								onChange={ callbacks.UserName}
								required
								
							/>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Email Address"
								fullWidth
								onChange={callbacks.UserEmail}
								required
							
							/>

							 <TextField
							 	  autoFocus
			  			          id="password"
			  			          label="Password, must be at least 8 characters"
			  			          margin = "dense"
			  			          type="password"
			  			          fullWidth
			  			          onChange = {callbacks.UserPassword}
			  			          required
			  			
				    	     />

				    	     <TextField
							 	   autoFocus
			  			          id="password"
			  			          label="Type Password Again"
			  			          margin = "dense"
			  			          type="password"
			  			          fullWidth
			  			          onChange ={callbacks.UserPassword}
			  			          required
			  			  
				    	     />

							<DialogActions>
							   	<Button  onClick= {callbacks.SubmitHand}>
							   		Create Account
							   	</Button>

							   	<Button onClick= {callbacks.HandleClickCloseDialog} >
							   		Cancel
							   	</Button>
							</DialogActions>
					</DialogContent>
				</Dialog>
			</div>
		)

}

export default withStyles(styles)(CreateNewProfileComp);
