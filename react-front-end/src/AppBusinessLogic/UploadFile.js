import React  from 'react';
import AppTopBar from '../AppComponents/AppTopBar.js';
import {connect} from 'react-redux';
import {getAllFiles, uploadFile} from '../ReduxFolder/Actions/FileActions.js';


class UploadFile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
				isFinished: true, 
				dataRec : "",
				token : " "
			}
	}

	componentWillReceiveProps(nextProps){
		this.setState({token: nextProps.token});
		this.seState({dataRec: nextProps.files});
		this.setState({isFinished: nextProps.isFinished})
		this.props.getFiles(this.state.token)
	}

	handleClick = (fileObj) => {
		this.props.upload(fileObj.base64, this.state.token);
	}

	render(){
		let isFinished = this.state.isFinished;
		let state = null;
		if(isFinished != true){
			return (
			     <AppTopBar  uploadFile={this.handleClick} /> 
			     // isloading component 

			);
		} else{
			return (
				<div>
					<AppTopBar  uploadFile={this.handleClick} /> 
					// show card 
				</div>
			);
		}
	}
}

// if login or create user is successful, we 
// obtain the token generated here
function mapStateToProps(state){
	const {token , files, isFinished} = state.UserProfile;
	return {
		token,
		files,
		isFinished
	};
}

function mapDispatchToProps(dispatch){
	return({
		getFiles: (jwtToken)=>{dispatch(getAllFiles(jwtToken));},
		upload: (file, jwtToken)=>{dispatch(uploadFile(file, jwtToken));}
	})
}

const  connectComp = connect(mapStateToProps)(UploadFile);
export { connectComp as UploadFile};
