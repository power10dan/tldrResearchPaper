import React  from 'react';
import AppTopBar from '../AppComponents/AppTopBar.js';
import {connect} from 'react-redux';
import {getAllFiles, downloadPDF, uploadFile, addSummaries} from '../ReduxFolder/Actions/FileActions.js';
import ErrSnack from '../AppComponents/ErrDialog.js';
import GridCardView from '../AppComponents/FileView.js';

class UploadFile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isFinished: true, 
			isLoggedIn: false,
			opWindow: false,
			token : "",
			message: "",
			fileData :[],
			fileSummaries: [],
			isOpenSum: false,
			newSummary: "",
			sectionOfSummary: ""
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

		if( nextProps.successMess !== ""){
			this.setState({message: nextProps.successMess});
		}

		if(nextProps.errorUploadFile !== ""){
			this.setState({message: nextProps.errorUploadFile});
		}	
	}

	handleClick = (fileObj) => {
		let nameOfFile = fileObj.fileList[0].name;
		this.props.upload(fileObj.base64, this.state.token, nameOfFile);
	}

	openCardDialog = ()=>{
		this.setState({isOpenSum: true});
	}

	closeCardDialog =  () =>{
		this.setState({isOpenSum: false});
	}

	getSumm = (text)=>{
		this.setState({newSummary: text.target.value});
	}

	getSectionOfSum = (text)=>{
		this.setState({sectionOfSummary: text.target.value});
	}

	handleAddSummary = () =>{
		// so far for demo purposes it only uploads
		// to one file. In the future, we might want to change that 
		let fileToUpload = this.state.fileData[0].FILES.files[1].summary_file
		if(this.state.newSummary !== "" && this.state.sectionOfSummary != ""){
			this.props.addSum(	this.state.token, 
								this.state.newSummary, 
								this.state.sectionOfSummary,
								fileToUpload
							 );
			this.closeCardDialog();	
		} else{
			this.closeCardDialog();
		}	
	}

	render(){
		let isFinished = this.state.isFinished;
		// if the app is uploading a file and is not finished with that yet, show loading bar
		if(isFinished === false ){
			if(this.state.fileData == null){
				return (
					<div>
			     		<AppTopBar  uploadFile={this.handleClick} loading={false} loggedIn= {false} disable={true} /> 
			  		</div>
			  	)
			} else {
				return(
					<div>
				     	<AppTopBar  uploadFile={this.handleClick} loading={true} loggedIn= {false} disable={true} /> 
				     	 <GridCardView 
				     	   arrayOfData = {this.state.fileData} 
				     	   cardDia={this.openCardDialog} 
				     	   isOpenSum={this.state.isOpenSum} 
				     	   closeDia={this.closeCardDialog}
                 getPDF={this.state.fileData[0].files[1].fileName, this.state.token}
				     	 />	
				  	</div>
				);
			}
			
		// if we are not logged in, don't  show anything
		} else if(this.state.isLoggedIn === false ){
			return(
				<div>
			    	 <AppTopBar  uploadFile={this.handleClick} loading={false} loggedIn= {false} disable={true} /> 
			 	</div>
			);
		}else{
			// at this point, we have either successfully or unsuccessfully uploaded a file. 
			// we show the messages in a pop-up window. 
			return(
				<div>
				    <ErrSnack message={this.state.message} openDialog={this.state.opWindow} />
				    <AppTopBar uploadFile={this.handleClick} loading={false} loggedIn={true} disable={false}/> 
				    <GridCardView 
				      arrayOfData = {this.state.fileData} 
				      cardDia={this.openCardDialog} 
				      isOpenSum={this.state.isOpenSum}
				      closeDia={this.closeCardDialog}
				      sectionFunc={this.getSectionOfSum}
				      summaryFunc={this.getSumm}
				      submitNewSummary={this.handleAddSummary}
				    />	
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
		isLoad,
		isLoggedIn,
		successMess,
		opDialog,
		errorUploadFile,
		files
	};
}

function mapDispatchToProps(dispatch){
	return({
		getFiles: (jwtToken)=>{dispatch(getAllFiles(jwtToken));},
		getPDF: (fileName, jwtToken)=>{dispatch(downloadPDF(jwtToken, fileName));},
		upload: (file, jwtToken, nameOfFile)=>{dispatch(uploadFile(file, jwtToken, nameOfFile));},
		addSum: (jwtToken, summary, section, nameOfFile)=>{dispatch(addSummaries(jwtToken,summary, section, nameOfFile))}
	})
}

const  connectComp = connect(mapStateToProps, mapDispatchToProps)(UploadFile);
export { connectComp as UploadFile};
