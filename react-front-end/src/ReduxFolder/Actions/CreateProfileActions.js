import * as types from '../Constants/ActionTypes';
import { DialogOpenCreate , DialogCloseCreate } from './DialogActions.js';
import { LogInSuccess, Login } from './LoginActions.js';

function _createProfileAction(
    a_username,
    a_password_one,
    a_password_two,
    a_account_email
) {
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

export function createProfileAction(
    a_user_name,
    a_password,
    a_password2,
    a_user_email
) {
	return dispatch => {
  		  _createProfileAction(a_user_name, a_password, a_password2, a_user_email)
            .then((response) => {

                if(response.status === 201){
                    return response.json();
                }

                if(response.status === 400 ){
                    dispatch(createFailedAction("Username already existied"));
                    dispatch(DialogOpenCreate());
                    setTimeout(()=>{dispatch(DialogCloseCreate());}, 2000);
                    return;
                }

  		      }).then((data)=>{

                if(typeof data !== 'undefined'){
                    dispatch(createSuccessAction("Profile Created!"));
                    dispatch(Login(a_user_name, a_user_email, a_password));
                    dispatch(LogInSuccess("You have logged in!"));
                    dispatch(DialogOpenCreate());
                    setTimeout(()=>{dispatch(DialogCloseCreate())}, 2000);

                    // save the token to the user profile
                    // dispatch(saveCred(a_user_name, a_user_email, data.key));

                }
  		      }).catch((err) =>{
  			        if(err.message === "Failed to fetch"){
                    dispatch(createFailedAction(
                        "Server Connection Refused. Are \
                        you connected to the WIFI?"));
                }
  		      });
	   };
}

export function createFailedAction(a_err_message){
    return {
        type: types.FAIL_CREATE,
        errorMess: a_err_message
    };
}

export function createSuccessAction(a_success_mess){
     return {
        type: types.CREATE_SUCCESS,
        successMessage: a_success_mess 
     };
}

export function resetDialogAction(){
    return {
      type: types.RESET_DIALOG
    }

}
