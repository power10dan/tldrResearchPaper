/*
 *	Action types, currently at
 *  create account, forgot password,
 *  and login and authenticate
 *
 *
 */

export const  LOGIN_SUCCESS   = 'LOGIN_SUCCESS';
export const  LOGIN_FAIL = 'LOGIN_FAILED';
export const  LOADING = 'LOADING';
export const  REQUEST = 'REQUEST';
export const  LOGOUT = 'LOGOUT';
export const  LOGIN_REQUEST = 'LOGIN_REQUEST';
export const  IS_DISABLE = 'IS_LOGIN_BUTTON_DISABLE';

export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const OPEN_CREATE_DIALOG = 'OPEN_CREATE_DIALOG';
export const CLOSE_CREATE_DIALOG = 'OPEN_CLOSE_DIALOG';
export const RESET_DIALOG = 'RESET_DIALOG';


export const CREATEACC = 'CREATEACC';
export const FAIL_CREATE = 'FAIL_CREATE';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const SAVE_ACC = 'SAVE_ACCOUNT';

/*export const FORGOTPass = 'FORGOTPass';
export const FORGOTACC  = 'FORGOTACC';
export const CREATEACC  = 'CREATEACC';
*/
export const UPLOADFILE = 'UPLOADFILE';
export const GETPDFSUCCESS = 'GETPDFSUCCESS';
export const DELETEFILE = 'DELETEFILE';
export const GETFILE = 'GETFILE';
export const DONEGET = 'DONEGET';
export const UPLOAD_FAILED = 'UPLOAD_FAILED';
export const GET_FAILED = 'GETFILE';
export const DIALOG_OP = 'DIALOG_OPEN';
export const DIALOG_CL = 'DIALOG_CL';
export const ADD_PAPER_DL = 'ADD_PAPER_DL';
