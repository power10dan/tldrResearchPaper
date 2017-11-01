import * as types from '../Constants/Actiontypess';

/*
 * Action creators
 *
 */


 // Async Operations, Converting them to Redux Thunk 
export function LogInOp(url){
 	return (dispatch) =>{
 		dispatch(isLoading(true))
 		fetch(url).then((response)=>{
 			if(!response.ok){
 				throw Error(response.statusText);
 				dispatch(isLoading(false))
 			}
 			dispatch(isLoading(false))
 			return response;
 		}).then((response)=> {
 				response.json()
 		}).then(()=> {
 		  	dispatch(LogInSuccess(true));
 		}).catch((err)=> {
 		  	   dispatch(LogInFailed(false, err))
 		})
 	};
 }


 // ================ Async Operations, Converting them to Redux Thunk ============================
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
 		isLogin: false 
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

//  make LogIn action return a function; THUNK!
export function LogInOp(url){
 	return (dispatch) =>{
 		dispatch(isLoading(true))
 		fetch(url).then((response)=>{
 			if(!response.ok){
 				throw Error(response.statusText);
 			}
 			  dispatch(isLoading(false));
 			  return response;
 		}).then((response)=> response.json())
 		  .then(()=> dispatch(LogInSuccess(true)))
 		      .catch((err)=> dispatch(LogInFailed(false, err)));

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

 export function UploadFile(fileToUpload){
 	return {type: types.UPLOADFILE, fileInfo: fileToUpload};
 }

 export function DELETEFILE(fileToDelete){
 	return {type: types.DELETEFILE, fileDel: fileToDelete};
 }*/
// =================================================================================================
