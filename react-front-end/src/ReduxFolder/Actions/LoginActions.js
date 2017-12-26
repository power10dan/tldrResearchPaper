import * as types from '../Constants/ActionTypes';
import { saveCredAction } from './SaveCred.js';
import { createSuccessAction } from './CreateProfileActions.js';
import { isLoadingAction } from './LoadingActions.js';
import { getAllFilesAction } from './FileActions.js';
import { dialogOpenAction} from './DialogActions.js';
/*
 * Action creators
 *
 */

/* helper login function takes a username and password, sends a request
   asynchronously validates the response, and stores the auth token locally if
   success, then return the user
*/
function _loginAction(a_user_name, a_password) {
    let headers = new Headers({
        "Content-Type": "application/json",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Allow-Origin": "localhost:3000/login/"
    });
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify({ username: a_user_name,
                               password: a_password
                            }),
        headers: headers
    };

    // set the url and use fetch to send request
    var url = "http://localhost:3000/login/";
    console.log("Sending", requestOptions);
    return fetch(url, requestOptions);
}

//actual login function
export function loginAction(a_user_name, a_user_email, a_password) {
    return dispatch => {
        // save user a_password
        _loginAction(a_user_name, a_password)
            .then((response) => {

            console.log("Received", response);
            if(response.ok !== true){
                dispatch(logInFailedAction(
                    "Login Failed, we can't find your credentials"));

                // only open dialog when it's asyncally reached here
                dispatch(dialogOpenAction());
                dispatch(isLoadingAction(false));
                return;

            } else{
                return response.json();
            }
        }).then((data) => {

            // if login fails, data will be undefined.
            // if not, then data should contain the login token.
            if(typeof data === 'undefined'){
                return;

            } else {
                let message = "Hello " + a_user_name;

                // clear login failed message
                dispatch(logInSuccessAction(message));
                dispatch(createSuccessAction(""));
                dispatch(saveCredAction(a_user_name, a_user_email, data.token));

                 // only open dialog when it's asyncally reached here
                dispatch(dialogOpenAction());

                // get all files
                dispatch(getAllFilesAction(data.token))
            }
        }).catch((err, status)=>{
            if(err.message === "Failed to fetch"){
                dispatch(logInFailedAction(
                    "Server Connection Refused, \
                     Please Contact Your System Admin"));

            }
        });
    };
}

// action dispatch for when login succeeds
export function logInSuccessAction(a_message){
  return {
      type: types.LOGIN_SUCCESS,
      a_is_logged_in: true,
      a_success_msg: a_message
  };
 }

 // action dispatch when loading failed
export function logInFailedAction(a_failure_message){
  return {
      type: types.LOGIN_FAIL,
      a_is_logged_in: false,
      a_error_msg: a_failure_message
  };
 }
