import React, { Fragment } from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';

const style = theme =>({
	snackbar: {
       margin: theme.spacing.unit,
    },
});

const LoadingSnack = (props)=>{
	const { classes } = props;
	return(
			<Snackbar
	          anchorOrigin={{
	            vertical: 'bottom',
	            horizontal: 'left',
	          }}
	          open={true}
	          autoHideDuration={6000}
	          onClose={this.handleClose}
	          SnackbarContentProps={{
	            'aria-describedby': 'message-id',
	          }}
	          message={<span id="message-id">File Uploading, Please Wait</span>}
	        />
		
	)
}

export default withStyles(style)(LoadingSnack);