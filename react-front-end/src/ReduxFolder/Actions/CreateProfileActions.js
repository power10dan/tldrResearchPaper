import * as types from '../Constants/ActionTypes';
import { UserProfile } from '../Reducers/UserProfile.js';
import { saveCred } from '../Actions/SaveCred.js';
import { DialogOpenCreate , DialogCloseCreate } from './DialogActions.js';

function _createProfile(username, password1, password2, account_emailaddress) {
    let url = "http://127.0.0.1:8000/rest-auth/registration/";
    let request = {
			  method: 'post',
			  body: JSON.stringify({ username, 
                               account_emailaddress, 
                               password1, 
                               password2
                            }),
			  headers: {
        	  'Content-Type': 'application/json'
        }
		}; 

    return fetch(url, request);
}

export function createProfile(userName, passWord, passWord2, userEmail){
	return dispatch => {
  		  _createProfile(userName, passWord, passWord2, userEmail)
            .then((response) => {
                if(response.status === 201){
                    return response.json();
                }
                if(response.status === 400  ){
                    dispatch(CreateFailed("Username already existied"));
                    dispatch(DialogOpenCreate()),
                    setTimeout(()=>{dispatch(DialogCloseCreate())}, 2000);
                    return;
                }

  		      }).then((data)=>{
                if(typeof data !== 'undefined'){
                    dispatch(CreateSuccess("Profile Created!"));
                    // save the token to the user profile 
                    dispatch(saveCred(userName, userEmail, data.key));

                }
  		      }).catch((err) =>{
  			        if(err.message === "Failed to fetch"){
                    dispatch(CreateFailed("Server Connection Refused. Are you connected to the WIFI?"));
                }
  		      });
	   };
}

export function CreateFailed(errMessage){
    return {
        type: types.FAIL_CREATE,
        errorMess: errMessage
    };
}

export function CreateSuccess(successMess){
     return {
        type: types.CREATE_SUCCESS,
        successMessage: successMess 
     };
}

export function ResetDialog(){
    return {
      type: types.RESET_DIALOG
    }

}
