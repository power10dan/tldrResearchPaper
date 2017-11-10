import * as types from '../Constants/ActionTypes';
import { saveCred } from '../Actions/SaveCred.js';
import { DialogOpenCreate , DialogCloseCreate } from './DialogActions.js';
import { LogInSuccess, Login } from './LoginActions.js';

function _createProfile(username, passwordFirst, passwordSecond, account_emailaddress) {
    let url = "http://127.0.0.1:8000/rest-auth/registration/";
    let request = {
			  method: 'post',
			  body: JSON.stringify({ username: username, 
                               account_emailaddress: account_emailaddress, 
                               password1: passwordFirst, 
                               password2: passwordSecond
                            }),
			  headers: {
        	  'Content-Type': 'application/json'
        }
		}; 
    console.log("i am in create profile");
    console.log(request)
    return fetch(url, request);
}

export function createProfile(userName, passWord, passWord2, userEmail){
	return dispatch => {
  		  _createProfile(userName, passWord, passWord2, userEmail)
            .then((response) => {
                if(response.status === 201){
                    return response.json();
                }
                if(response.status === 400 ){
                    dispatch(CreateFailed("Username already existied"));
                    dispatch(DialogOpenCreate()),
                    setTimeout(()=>{dispatch(DialogCloseCreate())}, 2000);
                    return;
                }

  		      }).then((data)=>{
                if(typeof data !== 'undefined'){
                    dispatch(CreateSuccess("Profile Created!"));
                    dispatch(Login(userName, userEmail, passWord));
                    dispatch(LogInSuccess("You have logged in!"));

                    // save the token to the user profile
                    // dispatch(saveCred(userName, userEmail, data.key));

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
