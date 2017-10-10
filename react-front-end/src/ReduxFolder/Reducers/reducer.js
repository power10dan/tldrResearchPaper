import {LOGIN, 
		FORGOTPass, 
		FORGOTACC, 
		CREATEACC, 
		UPLOADFILE, 
		DELETEFILE} from '../Actions/LoginActions.js';

import {combineReducers} from 'redux';
/*
 *  initial state: { 
 *      userProfile: { 
 *           id: Integer,
 *           isLogin: Boolean,
 *   		 userAcc: Text,
 *           userPass: CryptoHash,
 *
 *      },
 *       fileUploaded: [ { 
 * 				id: Integer, 
 * 				FileName: Text, 
 * 				Path: Text, 
 *  			PathXML: Text 
 *
 *
 *            
 * 		}] ...
 *  }
 * 
 *
 */
const initialState = {
	userProfile: {},
	fileUploaded : []
};


function loginReducer(state=initialState, action){
	switch(action.type){
		case LOGIN:
			return Object.assign({}, state, {
				isLogin: action.isLogin,
				userAcc: action.account,
				userPass: action.pass
			});

		case FORGOTPass:
			return Object.assign({}, state, {
				 userPass: action.pass
			});

		case FORGOTACC:
			return Object.assign({}, state, {
				userAcc: action.account
			});
	
		default:
			return state;
	}

	return state;
}


function fileUpload(state=initialState, action){
	switch(action.type){
		case UPLOADFILE:
			return Object.assign({}, state, {
				fileUploaded:[
					...state.fileUploaded,
					{
						FileName: action.fileInfo.FileName,
						Path: action.fileInfo.Path,
						PathXML: action.fileInfo.PathXML
					}
			]});

	}
}

const tldrApp = combineReducers({
	fileUpload,
	loginReducer
});

export default tldrApp;
