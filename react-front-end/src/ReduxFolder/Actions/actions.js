/*
 *	Action types, currently at
 *  create account, forgot password, 
 *  and login and authenticate
 *
 *
 */

export const LOGIN = 'LOGIN';
export const FORGOTPass = 'FORGOTPass';
export const FORGOTACC = 'FORGOTAcc';
export const CREATEACC = 'CREATEACC';
export const UPLOADFILE = 'UPLOADFILE';
export const DELETEFILE = 'DELETEFILE';

/*
 * Action creators
 *
 */

 export function LogIn(userName, passWord, success){
 	return {type: LOGIN, account: userName, pass: passWord, isLogin: success};
 }

 export function ForgotPass(email){
 	return {type: FORGOTPass, recoverEmail: email};
 }

 export function ForgotAcc(email){
 	return {type: FORGOTACC, recoverEmail: email};
 }

 export function CreateAcc(accountDetails){
 	return {type: CREATEACC, accDetail: accountDetails};
 }

 export function UploadFile(fileToUpload){
 	return {type: UPLOADFILE, fileInfo: fileToUpload};
 }

 export function DELETEFILE(fileToDelete){
 	return {type: DELETEFILE, fileDel: fileToDelete};
 }





