import React  from 'react';
import AppTopBar from '../AppComponents/AppTopBar.js';
import {connect} from 'react-redux';
import {getAllFilesAction,
        downloadPDFAction,
        addPaperToDLAction,
        uploadFileAction,
        addSummariesAction} from '../ReduxFolder/Actions/FileActions.js';
import ErrSnack from '../AppComponents/ErrDialog.js';
import GridCardView from '../AppComponents/FileView.js';

class UploadFile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			c_is_fin: true,                     // is finished or not
			c_is_logged_in: false,              // user logged in or not
			c_op_window: false,                 // is an op window open
			c_token : "",                       // component variable for token
			c_msg: "",                          // component message
      c_dl_file_names: new Set(),         // a set of filenames that changes
      c_user_name: "",
			c_file_data :[],                    // array of file data
			c_file_summaries: [],               // array of file summaries
			c_is_open_sum: false,               // is summary dialog open
			c_new_sum: "",                      // String to hold new summary
			c_sec_of_sum: ""                    // String to hold section of summary
		}
	}

	componentWillReceiveProps(nextProps){
		  this.setState({c_file_data: nextProps.st_files});
		  this.setState({c_op_window: nextProps.st_is_open_dialog});
      this.setState({c_dl_file_names: new Set(nextProps.st_dl_file_names)});
		  this.setState({c_file_summaries: nextProps.st_file_summs});

		if(nextProps.st_is_load === true){
			this.setState({c_is_fin: false});
		} else{
			this.setState({c_is_fin: true});
		}

		if(nextProps.st_is_logged_in === true){
			this.setState({c_is_logged_in: true});
      this.setState({c_user_name: nextProps.st_username});
		} else {
			this.setState({c_is_logged_in: false});
		}

		this.setState({c_token: nextProps.st_token});

		if( nextProps.st_success_msg !== ""){
			this.setState({c_msg: nextProps.st_success_msg});
		}

		if(nextProps.st_err_upload !== ""){
			this.setState({c_msg: nextProps.st_err_upload});
		}
	}

	handleClick = (fileObj) => {
		  let nameOfFile = fileObj.fileList[0].name;
		  this.props.getUpload(fileObj.base64, this.state.c_token, nameOfFile);
	}

  handleGetPDF = () => {
      this.props.getPDF(this.state.c_dl_file_names, this.state.c_token);
  }

	handleOpenCardDialog = ()=>{
		this.setState({c_is_open_sum: true});
	}

	handleCloseCardDialog =  () =>{
		this.setState({c_is_open_sum: false});
	}

	handleGetSumm = (text)=>{
		this.setState({c_new_sum: text.target.value});
	}

/**
  * Function handleCheck, adds the file_name for a file represented by the
  * card that holds the checkbox to a component array that is passed to getPDFs
  * when download PDFs is clicked
**/
  handleCheck = (file_name) => {
    this.props.getAddToDL(file_name);
  }

	handleGetSectionOfSum = (text)=>{
		this.setState({c_sec_of_sum: text});
	}

	handleAddSummary = filename => file_section => {
		// so far for demo purposes it only uploads
		// to one file. In the future, we might want to change that
    console.log("IN HANDLE", filename, file_section)
		if(this.state.c_new_sum !== "" && this.state.c_sec_of_sum !== ""){
			this.props.getAddSum(	this.state.c_token,
								this.state.c_new_sum,
								           file_section,
                           filename,
                this.state.c_user_name
							 );
		}
			this.handleCloseCardDialog();
	}

	render(){
		let c_is_fin = this.state.c_is_fin;
		// if the app is uploading a file and is not finished with that yet, show loading bar
		if(c_is_fin === false ){
			if(this.state.c_file_data === null || this.state.c_file_summaries === null){
				return (
					<div>
			     	<AppTopBar uploadFile       = {this.handleClick}
                       loading          = {false}
                       loggedIn         = {false}
                       disable          = {true}
            />
			  		</div>
			  	)
			} else {
				return(
					<div>
				    <AppTopBar uploadFile       = {this.handleClick}
                       loading          = {true}
                       loggedIn         = {false}
                       disable          = {true}
            />

				    <GridCardView arrayOfData    = {this.state.c_file_summaries}
				     	            cardDia        = {this.handleOpenCardDialog}
				     	            isOpenSum      = {this.state.c_is_open_sum}
				     	            closeDia       = {this.handleCloseCardDialog}
                          p_handleCheck  = {this.handleCheck}
				    />
				  	</div>
				);
			}

		// if we are not logged in, don't  show anything
		} else if(this.state.c_is_logged_in === false ){
			return(
				<div>
			    <AppTopBar uploadFile       = {this.handleClick}
                     loading          = {false}
                     loggedIn         = {false}
                     disable          = {true}
          />
			 	</div>
			);
		}else{
			// at this point, we have either successfully or unsuccessfully uploaded a file. 
			// we show the messages in a pop-up window. 
			return(
				<div>
				  <ErrSnack message    = {this.state.c_msg}
                    openDialog = {this.state.c_op_window}
          />

				  <AppTopBar uploadFile       = {this.handleClick}
                     loading          = {false}
                     loggedIn         = {true}
                     disable          = {false}
                     files            = {this.state.c_sel_files}
                     p_getPDF         = {this.handleGetPDF}
          />

				  <GridCardView arrayOfData      = {this.state.c_file_summaries}
				                cardDia          = {this.handleOpenCardDialog}
				                isOpenSum        = {this.state.c_is_open_sum}
				                closeDia         = {this.handleCloseCardDialog}
				                sectionFunc      = {this.handleGetSectionOfSum}
				                summaryFunc      = {this.handleGetSumm}
				                submitNewSummary = {this.handleAddSummary}
                        p_handleCheck    = {this.handleCheck}
				  />
				</div>
			);
		}
	}
}

// if login or create user is successful, we 
// obtain the tokens generated here
function mapStateToProps(state){
	  const {st_token} = state.userProfileReducer;
	const { st_files,
          st_success_msg,
          st_is_open_dialog,
          st_file_summs,
          st_err_upload} = state.genStateReducer;
	const { st_is_load } = state.isLoadingReducer;
	const { st_is_logged_in } = state.authentication;
	return {
		st_token,
    st_is_load,
    st_is_logged_in,
    st_success_msg,
    st_is_open_dialog,
    st_err_upload,
		st_files,
    st_file_summs: state.genStateReducer.st_file_summs,
    st_dl_file_names: state.genStateReducer.st_dl_file_names,
    st_username: state.userProfileReducer.st_username
	};
}

function mapDispatchToProps(dispatch){
	return({
		getFiles: (jwtToken)=>{dispatch(getAllFilesAction(jwtToken));},

		getPDF: (fileNames, jwtToken) =>
      {dispatch(downloadPDFAction(jwtToken, fileNames));},

		getAddToDL: (fileName, jwtToken) =>
      {dispatch(addPaperToDLAction(fileName, jwtToken));},

		getUpload: (file, jwtToken, nameOfFile)=>
      {dispatch(uploadFileAction(file, jwtToken, nameOfFile));},

		  getAddSum: (jwtToken, summary, section, nameOfFile, author)=>
          {dispatch(addSummariesAction(jwtToken,
                                       summary,
                                       section,
                                       nameOfFile,
                                       author));}
	});
}

const  connectComp = connect(mapStateToProps, mapDispatchToProps)(UploadFile);
export { connectComp as UploadFile};
