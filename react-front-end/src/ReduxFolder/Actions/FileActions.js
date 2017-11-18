import * as types from '../Constants/ActionTypes.js';
import { isLoading } from '../Actions/LoadingActions.js';

function __uploadFileAction(a_success_mess){
 	return {
 		  type: types.UPLOADFILE,
 		  successMessage: a_success_mess
    };
}

export function deleteFileAction(a_new_files){
	return {
        type: types.DELETEFILE,
        fileDel: a_new_files
    };
}

export function getFilesAction(a_data){
    return {
        type: types.GETFILE,
        files: a_data
     };
}

export function doneGetAction(){
 	return {
 		types: types.DONEGET
 	};
}

export function uploadFailedAction(a_err_message){
 	return {
 		type: types.UPLOAD_FAILED,
 		errUpload: a_err_message
 	};
}

export function getFailedAction(a_err_message){
 	return{
 		type: types.GET_FAILED,
 		errGet: a_err_message
 	};
}

export function getPDFSuccessAction(a_message, a_data, a_file_name){
  return{
  	  type: types.GETPDFSUCCESS,
  	  errDownload: a_message,
      fileName: a_file_name,
      data: a_data
  };
}

function _downloadFileAction(a_token, a_file_name){
    let urlGET = "http://127.0.0.1:8000/api/getPDFFile/?".concat(a_file_name);
    let strAuth = "JWT ".concat(a_token);
    let authString = strAuth.replace("\\\\","");

    let request = {
        method: 'GET',
        headers: {
            "Authorization": authString,
			      "Content-type": 'application/json'
        }
    };
    return fetch(urlGET, request);
};

function _uploadFileAction(a_file, a_token, a_file_name){
	  let jsonData =  a_file;
	  let urlPOST = "http://127.0.0.1:8000/api/uploadFile/".concat(a_file_name);
	  let strAuth = "JWT ".concat(a_token);
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

export function downloadPDFAction(a_token, a_file_name, a_prev_file_state){
  return dispatch=>{
    dispatch(isLoading(true));
    _downloadFileAction(a_token, a_file_name).then((response) => {
      if(response.status.ok){
      	  dispatch(getPDFSuccessAction(response.status,
                                       response.data,
                                       a_file_name));
        return response.json();
      } else {
        dispatch(isLoading(false));
        return response.status;
      }
    }).then((data)=>{
			  console.log(data);
		}).catch((err)=>{
			  console.log(err);
		});;
  };
}

export function uploadFileAction(file, a_token, a_file_name, a_prev_file_state){
	return dispatch =>{
		dispatch(isLoading(true));
		_uploadFileAction(file, a_token, a_file_name).then((response) => {
			// dispatch success 
			if(response.status.ok){
				return response.json();
			} else{
				dispatch(isLoading(false));

				return  response.status;
			}
		}).then((data)=>{
			if(data === 401){
				let message = "Failed to upload " + a_file_name + ", Permission Denied";
				  dispatch(uploadFailedAction(message));
				  dispatch(openDialogAction());
				  dispatch(isLoading(false));
				  setTimeout(()=>{dispatch(closeDialogAction());}, 2000);

			} else if(data === 500){
				  let message = "Failed to upload " + a_file_name +
              ", Internal Server Error";
				  dispatch(uploadFailedAction(message));
				  dispatch(openDialogAction());
				  dispatch(isLoading(false));
				  setTimeout(()=>{dispatch(closeDialogAction());}, 2000);

			} else{
				let successMessage = a_file_name + " uploaded successfully";
				  dispatch(__uploadFileAction(successMessage));
				  dispatch(getAllFilesAction(a_token));
				  dispatch(openDialogAction());
				  dispatch(isLoading(false));
				  setTimeout(()=>{dispatch(closeDialogAction());}, 2000);
			}
		}).catch((err)=>{
			  console.log(err);
		});;
	};
}

function _getAllFilesAction(a_token, a_new_summary, a_section_text){
	  let urlGET = "http://127.0.0.1:8000/api/getXMLAndSums/?num_files=5";
	  let strAuth = "JWT".concat(a_token);
	  let authString = strAuth.replace("\\\\", "");
	  let header = {
		    method: 'GET',
		    headers: {"Authorization": authString},
	  };

	  return fetch(urlGET, header);
}

function _addSummariesAction(a_token, a_new_sum, a_sect_text, a_name_of_file){
	  let urlAddSum = "http://127.0.0.1:8000/api/addUserSummary/";
	  let strAuth = "JWT ".concat(a_token);
	  let authString = strAuth.replace("\\\\", "");
	  let header = {
		    method: 'POST',
		    body:  JSON.stringify({"file_name": a_name_of_file,
			                         "section": a_sect_text,
			                         "summary_text": a_new_sum
			                        }),
		    headers: {
			      "Authorization": authString
		    }
	  };

	  return fetch(urlAddSum, header);
}

export function addSummariesAction(
    a_token,
    a_new_summary,
    a_section_text,
    a_name_of_file
) {
	return dispatch =>{
		dispatch(isLoading(true));
		  _addSummariesAction(a_token, a_new_summary, a_section_text, a_name_of_file)
          .then((response)=>{

			        if(response.ok){
				          return response.status;
			        }
		      }).then((data)=>{

			        if(data === 200){
				          dispatch(getAllFilesAction(a_token));
				          dispatch(isLoading(false));
			        }
              
		      }).catch((err)=>{
			        console.log(err);
		      })
	};
}


export function getAllFilesAction(a_token){
	return dispatch =>{
		  dispatch(isLoading(true));
		  _getAllFilesAction(a_token).then((response)=>{

			if(response.ok){
				  return response.json();
			} else {
		      return response.status;
			}

		}).then((data) =>{

			if(data === 400){
				  dispatch(isLoading(false));
				  let message = "Failed to get files";
		      dispatch(getFailedAction(message));
		      dispatch(openDialogAction());
		      setTimeout(()=>{dispatch(closeDialogAction());}, 2000);
		      return;
			}

	      dispatch(getFilesAction(data.Files));
	      dispatch(isLoading(false));
	      return;

		}).catch((err) =>{
			  console.log(err);
		});
	};
}

export function closeDialogAction(){
	return {
		type: types.DIALOG_CL
	};
}

export function openDialogAction(){
	return {
		type: types.DIALOG_OP
	};
}
