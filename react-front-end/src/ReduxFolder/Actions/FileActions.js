import * as types from '../Constants/ActionTypes.js';
import { isLoading } from '../Actions/LoadingActions.js';

export function UploadFile(fileToUpload, successMess){
 	return {  
 		  type: types.UPLOADFILE, 
 		  fileInfo: fileToUpload,
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
				dispatch(UploadFile(data, successMessage));
				dispatch(openDialog());
				dispatch(isLoading(false));
				setTimeout(()=>{dispatch(closeDialog())}, 2000);
			}
		}).catch((err)=>{
			  console.log(err);
		});;
	};
}

function _getAllFiles(token){
	let urlGET = "http://127.0.0.1:8000/api/getAllFiles/";
	let strAuth = "JWT" + " " + token;
	let authString = strAuth.replace("\\\\", "");
	let header = {
		method: 'GET',
		headers: {"Authorization": authString}
	};

	return fetch(urlGET, header);
}

export function getAllFiles(token){
	return dispatch =>{
		dispatch(isLoading(true));
		_getAllFiles(token).then((response)=>{
			if(response.ok){
				  return response.json();
			} else{
	          let message = "Failed to get files";
	          dispatch(GetFailed(message));
	          dispatch(openDialog());
	          setTimeout(()=>{dispatch(closeDialog())}, 2000);
	          return;
			}
		}).then((data) =>{
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