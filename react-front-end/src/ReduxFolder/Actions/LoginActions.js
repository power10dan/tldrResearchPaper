import * as types from '../Constants/ActionTypes';
import { saveCred } from './SaveCred.js';
import { CreateSuccess } from './CreateProfileActions.js';
import { isLoading } from './LoadingActions.js';
/*
 * Action creators
 *
 */

/* helper login function takes a username and password, sends a request
   asynchronously validates the response, and stores the auth token locally if
   success, then return the user
*/
function _Login(userName, passWord) {
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify({ username: userName, 
                               password: passWord
                            }),
        headers: { 'Content-Type': 'application/json' }
    };

    // set the url and use fetch to send request
    var url = "http://127.0.0.1:8000/login/";
    return fetch(url, requestOptions);
}

//actual login function
export function Login(userName, userEmail, password) {
    //let hash = bcrypt.hashSync(password, 10);
    //console.log(hash);
    return dispatch => {
        // save user password
        _Login(userName, password).then((response) => {
            let status = response.status;
            if(response.ok != true){
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
                let message = "Hello " + userName
                dispatch(LogInSuccess(message));
                dispatch(CreateSuccess(""));
                dispatch(saveCred(userName, userEmail, data.token));
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
 }


 /*export function ForgotPass(email){
 	return {type: types.FORGOTPass, recoverEmail: email};
 }

 export function ForgotAcc(email){
 	return {type: types.FORGOTACC, recoverEmail: email};
 }
 */
