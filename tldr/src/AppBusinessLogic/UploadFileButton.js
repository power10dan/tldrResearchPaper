import React, { Component, Fragment} from 'react';
import { UploadNewPaper } from '../Redux/Actions/ActionCreators.js';
import { uploadFile } from '../AppUrlConstants.js';
import { connect } from 'react-redux';
import ButtonUpload from '../AppComponent/UploadButton.js';
import { Base64 } from 'js-base64';

class UploadPaperToServer extends Component{
	constructor(props){
		super(props);
		this.state={
			uploadFileTag:false
		}
	}

	uploadFileCallBack = (files)=>{
		if(files.fileList !== undefined){
			let rawData = Base64.decode(files.base64.split(",")[1]);
			let urlUpload = uploadFile + "/";
			console.log(urlUpload)
			this.props.uploadFileToServer(urlUpload, rawData);
		}
		
	}

	render(){
		const { classes } = this.props;
		return(
			<ButtonUpload
				uploadFile={this.uploadFileCallBack}
			/>
		);
	}
} 

const mapDispatchToProps = (dispatch)=>{
	return({
		uploadFileToServer: (url, payLoad)=>{dispatch(UploadNewPaper(url, payLoad))},
	})
}

const UploadPaperComp = connect(null, mapDispatchToProps)(UploadPaperToServer);
export default UploadPaperComp;