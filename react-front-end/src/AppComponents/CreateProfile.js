import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
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
    	fontSize: 40,  
    	marginTop: 20,
    	color: "#FFFFFF",
    },
});


class CreateNewProfileComp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: false
		};
	}

	 handleClickOpen = () => {
	    this.setState({ open: true });
	 };

  	 handleRequestClose = () => {
    	this.setState({ open: false });
  	};

  	render() {
  		return(
			<div>
				<Button dense color="primary" onClick = {this.handleClickOpen}>
		  			 Create Account
		  		</Button>

				<Dialog open ={this.state.open} onRequestClose={this.handleRequest}>
					<DialogTitle className={ this.props.classes.titleStyle}> 
						<Typography className={ this.props.classes.title} > 
								Create Account 
						</Typography>
					</DialogTitle>
					<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Account Name"
								type="accountNumber"
								fullWidth
							/>
							            
							 <TextField
							 	   autoFocus
			  			          id="password"
			  			          label="Password"
			  			          margin = "dense"
			  			          type="password"
			  			          fullWidth
				    	     />

				    	     <TextField
							 	   autoFocus
			  			          id="password"
			  			          label="Type Password Again"
			  			          margin = "dense"
			  			          type="password"
			  			          fullWidth
				    	     />

							<DialogActions>
							   	<Button  onClick= {this.handleRequestClose}>
							   		Create Account 
							   	</Button>

							   	<Button onClick= {this.handleRequestClose} >
							   		Cancel
							   	</Button>
							</DialogActions>
					</DialogContent>
				</Dialog>
			</div>
		)

  	}
}  


export default withStyles(styles)(CreateNewProfileComp);