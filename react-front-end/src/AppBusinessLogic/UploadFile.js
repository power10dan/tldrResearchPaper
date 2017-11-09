import React  from 'react';
import AppTopBar from '../AppComponents/AppTopBar.js';
import {connect} from 'react-redux';
import {getAllFiles, uploadFile} from '../ReduxFolder/Actions/FileActions.js';
import ErrSnack from '../AppComponents/ErrDialog.js';
import {closeDialog} from '../ReduxFolder/Actions/FileActions.js';
import GridCardView from '../AppComponents/FileView.js';

class UploadFile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isFinished: true, 
			isLoggedIn: false,
			opWindow: false,
			fileData : "",
			token : "",
			message: "",
			err: " ",
			files :[],
			fileSummaries: [],
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({fileData: nextProps.files});
		this.setState({opWindow: nextProps.opDialog});


		if(nextProps.isLoad === true){
			this.setState({isFinished: false});
		} else{
			this.setState({isFinished: true});
		}

		if(nextProps.isLoggedIn === true){
			this.setState({isLoggedIn: true});
		} else {
			this.setState({isLoggedIn: false});
		}

		this.setState({token: nextProps.token}); 
		if( nextProps.successMess != ""){
			this.setState({message: nextProps.successMess});
		}

		if(nextProps.errorUploadFile != ""){
			this.setState({message: nextProps.errorUploadFile});
		}
		
	}

	handleClick = (fileObj) => {
		let nameOfFile = fileObj.fileList[0].name;
		this.props.upload(fileObj.base64, this.state.token, nameOfFile);
	}

	render(){
		let isFinished = this.state.isFinished;
		// if app is not finished doing task (isFinished) or if there is no token (not logged in),
		// disable the buttons
		if(isFinished === false ){
			return(
				<div>
			     	<AppTopBar  uploadFile={this.handleClick} loading={true} loggedIn= {false} disable={true}/> 
			  	</div>
			);
		} else if(this.state.isLoggedIn === false){
			return(
				<div>
			    	 <AppTopBar  uploadFile={this.handleClick} loading={false} loggedIn= {false} disable={true}/> 
			 	</div>
			);

		}else{
			return(
				<div>
				    <ErrSnack message={this.state.message} openDialog={this.state.opWindow} />
				    <AppTopBar  uploadFile={this.handleClick} loading={false} loggedIn={true} disable={false}/> 	
				</div>
			);
		}
	}
}

// if login or create user is successful, we 
// obtain the token generated here
function mapStateToProps(state){
	const {token} = state.UserProfile;
	const { files, successMess, opDialog, errorUploadFile } = state.genStateReducer;
	const { isLoad } = state.isLoadingReducer;
	const {isLoggedIn } = state.authentication;
	return {
		token,
		files,
		isLoad,
		isLoggedIn,
		successMess,
		opDialog,
		errorUploadFile
	};
}

function mapDispatchToProps(dispatch){
	return({
		getFiles: (jwtToken)=>{dispatch(getAllFiles(jwtToken));},
		upload: (file, jwtToken, nameOfFile)=>{dispatch(uploadFile(file, jwtToken, nameOfFile));}
	})
}

const  connectComp = connect(mapStateToProps, mapDispatchToProps)(UploadFile);
export { connectComp as UploadFile};
