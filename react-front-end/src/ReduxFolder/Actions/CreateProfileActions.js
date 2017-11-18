import * as types from '../Constants/ActionTypes';
import { saveCred } from '../Actions/SaveCred.js';
import { DialogOpenCreate , DialogCloseCreate } from './DialogActions.js';
import { LogInSuccess, Login } from './LoginActions.js';

function _createProfileAction(username,
                              password_one,
                              password_two,
                              account_email_address) {
    let url = "http://127.0.0.1:8000/rest-auth/registration/";
    let request = {
			  method: 'post',
			  body: JSON.stringify({ username: username, 
                               account_emailaddress: account_email_address, 
                               password1: password_one, 
                               password2: password_two
                            }),
			  headers: {
        	  'Content-Type': 'application/json'
        }
		}; 
    return fetch(url, request);
}

export function createProfileAction(user_name,
                                    password_one,
                                    password_two,
                                    user_email) {
	return dispatch => {
  		  _createProfile(user_name, password_one, password_two, user_email)

            .then((response) => {

                if(response.status === 201){
                    return response.json();
                }

                if(response.status === 400 ){
                    dispatch(createFailedAction("Username already exists"));
                    dispatch(DialogOpenCreate()),
                    setTimeout(()=>{dispatch(DialogCloseCreate())}, 2000);
                    return;
                }

  		      }).then((data)=>{

                if(typeof data !== 'undefined'){

                    dispatch(createSuccessAction("Profile Created!"));
                    dispatch(Login(user_name, user_email, password_one));
                    dispatch(LogInSuccess("You have logged in!"));
                    dispatch(DialogOpenCreate()),
                    setTimeout(()=>{dispatch(DialogCloseCreate());}, 2000);

                }
  		      }).catch((err) =>{
  			        if(err.message === "Failed to fetch"){
                    dispatch(createFailedAction(
                        "Server Connection Refused. \
                         Are you connected to the WIFI?"));
                }
  		      });
	   };
}

export function createFailedAction(errMessage){
    return {
        type: types.FAIL_CREATE,
        errorMess: errMessage
    };
}

export function createSuccessAction(successMess){
     return {
        type: types.CREATE_SUCCESS,
        successMessage: successMess 
     };
}

export function resetDialogAction(){
    return {
      type: types.RESET_DIALOG
    }

}
