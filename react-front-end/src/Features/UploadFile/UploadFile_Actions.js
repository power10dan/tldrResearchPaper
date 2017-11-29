import * as types from '../Common/Constants/ActionTypes.js';
import { isLoading } from '../Common/Actions/Loading_Action.js';

export function UploadFile( successMess){
 	return {  
 		  type: types.UPLOADFILE, 
 		  successMessage: successMess
    };
}

export function DeleteFile(newFiles){
	return {
        type: types.DELETEFILE, 
        fileDel: newFiles
    };
}

export function GetFiles(data){
    return {
        type: types.GETFILE,
        files: data
     };
}

export function DoneGet(){
 	return {
 		types: types.DONEGET
 	};
}

export function UploadFailed(errMessage){
 	return {
 		type: types.UPLOAD_FAILED,
 		errUpload: errMessage,
 	};
}

export function GetFailed(errMessage){
 	return{
 		type: types.GET_FAILED,
 		errGet: errMessage,
 	};
}

export function getPDFSuccess(message){
  return{
  	type: types.GETPDFSUCCESS,
  	errDownload: message
  }
}

function _downloadFile(token, fileName){
  let urlGET = "http://127.0.0.1:8000/api/getPDFFile/".concat(fileName);
  let strAuth = "JWT" + " " +token;
  let authString = strAuth.replace("\\\\","");

  let request = {
    method: 'GET',
    body: "",
    file_names: [fileName],
    headers: {
      Authorization: authString,
      "Content-type": 'application/json'
    }
  };
  return fetch(urlGET, request)
};

function _uploadFile(file, token, fileName){
	let jsonData =  file;
	let urlPOST = "http://127.0.0.1:8000/api/uploadFile/".concat(fileName);
	let strAuth = "JWT" + " " + token ;
	let authString = strAuth.replace("\\\\", "");

	let header = {
		method: 'POST',
		body: jsonData ,
		dataType: 'json',
		mode: 'cors',
		headers: {
			Authorization: authString,
			"Content-type": 'application/json'
		}
	};
	return fetch(urlPOST, header);
}

export function downloadPDF(token, fileName, prevFileState){
  return dispatch=>{
    dispatch(isLoading(true));
    _downloadFile(token, fileName).then((response) => {
      if(response.status.ok){
      	dispatch(getPDFSuccess(response.status))
        return response.json();
      } else {
        dispatch(isLoading(false));
        return response.status;
      }
    }).then((data)=>{
			console.log(data)
		}).catch((err)=>{
			  console.log(err);
		});;
  };
}

export function uploadFile(file, token, fileName, prevFileState){
	return dispatch =>{
		dispatch(isLoading(true));
		_uploadFile(file, token, fileName).then((response) => {
			// dispatch success 
			if(response.status.ok){
				return response.json();
			} else{
				dispatch(isLoading(false));

				return  response.status;
			}
		}).then((data)=>{
			console.log(data)
			if(data === 401){
				let message = "Failed to upload " + fileName + ", Permission Denied";
				dispatch(UploadFailed(message));
				dispatch(openDialog());
				dispatch(isLoading(false));
				setTimeout(()=>{dispatch(closeDialog())}, 2000);
			} else if(data === 500){
				let message = "Failed to upload " + fileName + ", Internal Server Error";
				dispatch(UploadFailed(message));
				dispatch(openDialog());
				dispatch(isLoading(false));
				setTimeout(()=>{dispatch(closeDialog())}, 2000);
			} else{
				let successMessage = fileName + " uploaded successfully";
				dispatch(UploadFile(successMessage));
				dispatch(getAllFiles(token));
				dispatch(openDialog());
				dispatch(isLoading(false));
				setTimeout(()=>{dispatch(closeDialog())}, 2000);
			}
		}).catch((err)=>{
			  console.log(err);
		});;
	};
}

function _getAllFiles(token, newSummary, sectionText){
	let urlGET = "http://127.0.0.1:8000/api/getXMLAndSums/?num_files=5";
	let strAuth = "JWT" + " " + token;
	let authString = strAuth.replace("\\\\", "");
	let header = {
		method: 'GET',
		headers: {"Authorization": authString},
	};

	return fetch(urlGET, header);
}

function _addSummaries(token, newSum, sectText, nameOfFile){
	let urlAddSum = "http://127.0.0.1:8000/api/addUserSummary/";
	let strAuth = "JWT" + " " + token;
	let authString = strAuth.replace("\\\\", "");
	let header = {
		method: 'POST',
		body:  JSON.stringify({"file_name": nameOfFile, 
			    "section": sectText,
			    "summary_text": newSum
			 }),
		headers: {
			"Authorization": authString
		},	
	};
	
	return fetch(urlAddSum, header);
}

export function addSummaries(token, newSummary, sectionText, nameOfFile){
	return dispatch =>{
		dispatch(isLoading(true));
		_addSummaries(token, newSummary, sectionText, nameOfFile).then((response)=>{
			if(response.ok){
				return response.status
			} 
		}).then((data)=>{
			if(data == 200){
				dispatch(getAllFiles(token));
				dispatch(isLoading(false));
			}

		}).catch((err)=>{
			console.log(err)
		})
	};
}


export function getAllFiles(token){
	return dispatch =>{
		dispatch(isLoading(true));
		_getAllFiles(token).then((response)=>{
			if(response.ok){
				  return response.json();
			} else{
		        return response.status;
			} 
		}).then((data) =>{
			if(data === 400){
				dispatch(isLoading(false));
				let message = "Failed to get files";
		        dispatch(GetFailed(message));
		        dispatch(openDialog());
		        setTimeout(()=>{dispatch(closeDialog())}, 2000);
		        return;
			}

	        dispatch(GetFiles(data.Files));
	        dispatch(isLoading(false));
	        return;

		}).catch((err) =>{
			console.log(err);
		});
	};
}

export function closeDialog(){
	return {
		type: types.DIALOG_CL,
	}
}

export function openDialog(){
	return {
		type: types.DIALOG_OP,
	}
}
