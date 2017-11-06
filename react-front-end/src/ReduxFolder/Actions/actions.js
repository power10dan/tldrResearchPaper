import * as types from '../Constants/ActionTypes';
import { saveCred } from '../Actions/SaveCred.js';
/*
 * Action creators
 *
 */

/* helper login function takes a username and password, sends a request
   asynchronously validates the response, and stores the auth token locally if
   success, then return the user
*/
function _Login(username, password) {
    // set the request options
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, 
                               password
                            }),
    };

    // set the url and use fetch to send request
    var url = "http://127.0.0.1:8000/login/";
    return fetch(url, requestOptions);
}

// save user login credentials
export function dispatchUserCred(username, userpass){
    return {
        type: types.REQUEST,
        username: username,
        userpassword: userpass
    };
}

//actual login function
export function Login(userName, userEmail, password) {
    return dispatch => {
        // save user password
        _Login(userName, password).then((response) => {
            let status = response.status;
            if(response.ok != 201){
                dispatch(LogInFailed("Login Failed"));
                dispatch(isLoading(false));
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
                dispatch(LogInSuccess("You have logged in!"));
                dispatch(saveCred(userName, userEmail, data.key));
            }
        }).catch((err, status)=>{
            if(err.message === "Failed to fetch"){
                dispatch(LogInFailed("Server Connection Refused, Please Contact Your System Admin"));
                dispatch(isLoading(false));
            }
        });
    };
}

// action dispatch for when login succeds
export  function LogInSuccess(message){
 	return {
 		type: types.LOGIN_SUCCESS,
 		isLogin: true,
        successMessage: message
 	};
 }

 // action dispatch when loading failed
export function LogInFailed(failureMessage){
 	return {
 		  type: types.LOGIN_FAIL,
 		  isLogin: false,
 		  message: failureMessage
 	};
 };
// simple actions when app is loading
export function isLoading(isLoadingStats){
	return {
		type: types.LOADING,
		isLoading: isLoadingStats
	};
}

// if this action dispatches true, we don't disable 
// the login button. Else, we disable th login button
// so user can't login unless they enter their 
// user names and password

export function isDisableButton(isDisable){
    return{
        type: types.IS_DISABLE,
        disable : isDisable,
    };
}

 /*export function ForgotPass(email){
 	return {type: types.FORGOTPass, recoverEmail: email};
 }

 export function ForgotAcc(email){
 	return {type: types.FORGOTACC, recoverEmail: email};
 }
 */


 export function UploadFile(fileToUpload){
 	return {type: types.UPLOADFILE, fileInfo: fileToUpload};
 }


 export function DeleteFile(fileToDelete){
 	return {type: types.DELETEFILE, fileDel: fileToDelete};
 }

