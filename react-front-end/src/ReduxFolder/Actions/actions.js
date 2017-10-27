import * as types from '../Constants/ActionTypes';
/*
 * Action creators
 *
 */

 export function LogIn(userName, passWord, success){
 	return {type: types.LOGIN, account: userName, pass: passWord, isLogin: success};
 }

 export function ForgotPass(email){
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
 }
