import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const LoadingSnack = (props)=>{
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
	          message={<span id="message-id">{props.messageStatus}</span>}
	        />
		
	)
}

export default LoadingSnack;