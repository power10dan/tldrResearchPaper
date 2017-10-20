import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import stylesAppTopBar from './AppComponentStyles/AppTopBarStyle.js';
import ReactFileReader from 'react-file-reader';


const AppTopBar = (props) =>{
	return (
	    <div className={props.classes.root} >
		      <AppBar position="static" >
		        <Toolbar>
		          <Typography type="title" color="inherit" >
		            TL ; DR Please?
		          </Typography>
	
			          <ReactFileReader 
			                 base64={true} 
			                 fileTypes=".pdf" 
			                 handleFiles={props.uploadFile}>

			          	    <Button color="contrast"  
					          	component="span" 
					          	className = {props.classes.menuButton} >
				          	   Upload Files
				             </Button>
				       </ReactFileReader>		          
		          <Button color="contrast" className = {props.classes.menuButton} >About This App</Button>
		        </Toolbar>
		      </AppBar>
	    </div>
	  );
};

export default withStyles(stylesAppTopBar)(AppTopBar);