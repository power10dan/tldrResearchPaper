import React, { Component, Fragment} from 'react';
import { AppStateActionCreator } from '../Redux/Actions/ActionCreators.js';
import { uploadFile } from '../AppUrlConstants.js';
import { connect } from 'react-redux';
import ButtonUpload from '../AppComponent/UploadButton.js';

class UploadPaperToServer extends Component{
	constructor(props){
		super(props);
		this.state={
			uploadFileTag:false
		}
	}

	uploadFileCallBack = (fileObj)=>{
		console.log(fileObj)
		if(fileObj !== undefined){
			console.log(fileObj.fileList[0].name);
			console.log("hello world");
			let payLoad = fileObj;
			this.props.uploadFileToRedux(payLoad);
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
		uploadFileToRedux: (payLoad)=>{dispatch(AppStateActionCreator(payLoad))},
	})
}

const UploadPaperComp = connect(null, mapDispatchToProps)(UploadPaperToServer);
export default UploadPaperComp;