import React, { Component, Fragment} from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const style = theme=>({
	buttonBackground: {
		color: "#ffffff",
		position: "absolute",
		marginTop: "14px",
		marginRight: "75px",
		top: "0",
		right: "0"
	},
})

class UploadPaperToServer extends Component{
	constructor(props){
		super(props);
	}

	uploadFile = ()=>{
		console.log("hello world");

	}

	render(){
		const {classes} = this.props;
		return(
			<Button color={"accent"}onClick={this.uploadFile} className={classes.buttonBackground}>
				Upload A File 
			</Button>
		);
	}
} 

export default withStyles(style)(UploadPaperToServer);
