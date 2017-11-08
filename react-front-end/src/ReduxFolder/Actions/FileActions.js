import * as types from '../Constants/ActionTypes.js';


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

export function GetFiles(){
    return {
        type: types.GETFILE
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

function _uploadFile(file, token){
	let jsonData =  file
	let urlPOST = "http://127.0.0.1:8000/api/uploadFile/".concat(file);
	let authString = "Authorization: JWT " + token 
	let header = {
		method: 'post',
		body: jsonData ,
		dataType: 'json',
		Authorization: JSON.stringfy(authString),
		mode: 'no-cors',
		headers: {
            'Content-Type': 'application/json',
       	}
	};

	return fetch(urlPOST, header);

}

export function uploadFile(file, token){
	return dispatch =>{
		_uploadFile(file, token).then((response) => {
			// dispatch success 
			if(response.status.ok){
				return response.json();
			} else{
				let message = "Failed to upload" + file;
				dispatch(UploadFailed(message));
			}
		}).then((data)=>{
			let message = "Successfully uploaded file" + file;
			dispatch(UploadFile(data, message));
		}).catch((err)=>{
			console.log(err)
		});;
	};
}

function _getAllFiles(token){
		console.log(token)
	let urlGET = "http://127.0.0.1:8000/api/getAllFiles/";
	let authString = JSON.stringify("JWT" + " " + token );
	console.log("auth string")
	console.log(authString);
	let header = {
			method: 'get',
			Authorization: JSON.stringify(authString),
	};

	return fetch(urlGET, header);
}

export function getAllFiles(token){
	return dispatch =>{
		_getAllFiles(token).then((response)=>{
			if(response.ok){
				dispatch()
				return response.json();
			} else{

			}
		}).then((response) =>{
			


		}).catch((err) =>{
			console.log(err);
		})


	}
}






