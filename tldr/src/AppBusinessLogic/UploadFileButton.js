import React, { Component, Fragment} from 'react';
import { UploadNewPaper, AppStateActionCreator } from '../Redux/Actions/ActionCreators.js';
import { uploadFile } from '../AppUrlConstants.js';
import { connect } from 'react-redux';
import ButtonUpload from '../AppComponent/UploadButton.js';
import * as actionTypes from '../Redux/Actions/ActionConstants.js';

class UploadPaperToServer extends Component{
	constructor(props){
		super(props);
		this.state={
			uploadFileTag:false,
		}
	}

	uploadFileCallBack = (files)=>{
		 if(files.fileList !== undefined){
		    let filenametmp = files.fileList[0].name;
		    let filePayload = {tempfile: files.fileList[0], filename: filenametmp};
		    let urlUpload = uploadFile + "/";
		    this.props.shouldLoad(true);
		    this.props.uploadFileToServer(urlUpload, filePayload);
		 }
		
	}

	render(){
		return(
			<Fragment>
				<ButtonUpload
					uploadFile={this.uploadFileCallBack}
				/>
			</Fragment>
		);
	}
} 

const mapDispatchToProps = (dispatch)=>{
	return({
		uploadFileToServer: (url, payLoad)=>{dispatch(UploadNewPaper(url, payLoad))},
		shouldLoad: (status)=>{dispatch(AppStateActionCreator(actionTypes.APP_ISLOADING, status))}
	})
}

const UploadPaperComp = connect(null, mapDispatchToProps)(UploadPaperToServer);
export default UploadPaperComp;