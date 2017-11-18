import * as types from '../Constants/ActionTypes';
import { DialogOpenCreate , DialogCloseCreate } from './DialogActions.js';
import { LogInSuccess, Login } from './LoginActions.js';

function _createProfile(a_username, a_password_one, a_password_two, a_account_email) {
    let url = "http://127.0.0.1:8000/rest-auth/registration/";
    let request = {
			  method: 'post',
			  body: JSON.stringify({ username: a_username,
                               account_emailaddress: a_account_email,
                               password1: a_password_one,
                               password2: a_password_two
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
                if(response.status === 400 ){
                    dispatch(CreateFailed("Username already existied"));
                    dispatch(DialogOpenCreate());
                    setTimeout(()=>{dispatch(DialogCloseCreate())}, 2000);
                    return;
                }

  		      }).then((data)=>{
                if(typeof data !== 'undefined'){
                    dispatch(CreateSuccess("Profile Created!"));
                    dispatch(Login(userName, userEmail, passWord));
                    dispatch(LogInSuccess("You have logged in!"));
                    dispatch(DialogOpenCreate());
                    setTimeout(()=>{dispatch(DialogCloseCreate())}, 2000);
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
