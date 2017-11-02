import * as types from '../Constants/ActionTypes';

/*
 * Action creators
 *
 */


 // Async Operations, Converting them to Redux Thunk
// export function LogInOp(url){
//  	return (dispatch) =>{
//  		  dispatch(isLoading(true));
//  		  fetch(url).then((response)=>{
//  			    if(!response.ok){
//  				      throw Error(response.statusText);
//  				      dispatch(isLoading(false));
//  			    }
//  			  dispatch(isLoading(false));
//  			    return response;
//  		  }).then((response)=> {
//  				  response.json();
//  		  }).then(()=> {
//  		  	  dispatch(LogInSuccess(true));
//  		  }).catch((err)=> {
//  		  	  dispatch(LogInFailed(false, err));
//  		  });
//  	};
// }

/* helper login function takes a username and password, sends a request
   asynchronously validates the response, and stores the auth token locally if
   success, then return the user
*/
function _login(username, password) {
    // set the request options
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    // set the url and use fetch to send request
		let url = "http://127.0.0.1:8000/rest-auth/login/";
    return fetch(url, requestOptions)
        .then(response => {

            // if response is bad then return the status text
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            // if good then return the response json
            return response.json;
        })

    // catch the json which is a user
        .then(user => {
            // if user is good and we have a token, save token which is the same
            // as being logged in
            if (user && user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}


/* actual login function
*/
export function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        _login(username, password)
            .then(
                user => {
                    dispatch(LogInSuccess(true));
                },
                error => {
                    dispatch(LogInFailed(false, err));
                });
        
    };
}

 // ================ Async Operations, Converting them to Redux Thunk ===========
 // action dispatch for when login succeds
export function LogInSuccess(successStatus){

 	return {
 		type: types.LOGIN_SUCCESS,
 		isLogin: successStatus
 	};
 }

 // action dispatch when loading failed
export function LogInFailed(failureStatus, failureMessage){
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

 /*export function ForgotPass(email){
 	return {type: types.FORGOTPass, recoverEmail: email};
 }

 export function ForgotAcc(email){
 	return {type: types.FORGOTACC, recoverEmail: email};
 }

 export function CreateAcc(accountDetails){
 	return {type: types.CREATEACC, accDetail: accountDetails};
 }
 */

 export function UploadFile(fileToUpload){
 	return {type: types.UPLOADFILE, fileInfo: fileToUpload};
 }

 export function DELETEFILE(fileToDelete){
 	return {type: types.DELETEFILE, fileDel: fileToDelete};
 }
// =================================================================================================
