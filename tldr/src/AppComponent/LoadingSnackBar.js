import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

const LoadingSnack = (props)=>{
	return(
			<Snackbar
	          anchorOrigin={{
	            vertical: 'bottom',
	            horizontal: 'left',
	          }}
	          open={props.open}
	          SnackbarContentProps={{
	            'aria-describedby': 'message-id',
	          }}
	           action={[
	            <Button key="undo" color="secondary" size="small" onClick={props.onClose}>
	              Close 
	            </Button>,
	           
	          ]}
	          message={<span id="message-id">{props.messageStatus}</span>}
	        />
		
	)
}

export default LoadingSnack;