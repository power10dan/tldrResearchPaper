import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ReactFileReader from 'react-file-reader';

const style = theme=>({
	buttonBackground: {
		color: "#ffffff",
		position: "absolute",
		marginTop: "14px",
		marginRight: "75px",
		top: "0",
		right: "0"
	},
});

const ButtonUpload = (props)=>{
	const { classes } = props;
	return(
		<ReactFileReader handleFiles={props.uploadFile}>
			<Button color={"accent"}
				onClick={props.uploadFile} 
				className={classes.buttonBackground}
			>			
				Upload A File 
			</Button>
		</ReactFileReader>
	);
}

export default withStyles(style)(ButtonUpload);