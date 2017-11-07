import * as types from '../Constants/ActionTypes';
import { userProfile } from '../Store/initialStoreState.js';

export default function UserProfile(state = userProfile, action){
	switch(action.type){
		case types.SAVE_ACC:
			return Object.assign({}, state, {
				userName: action.userAcc,
				userEmail: action.email,
				token: action.token
			});
		case types.UPLOADFILE:
			return Object.assign({}, state, {
				files:action.fileInfo,
				successMess: action.successMessage
			});

		case types.DELETEFILE:
			return Object.assign({}, state, {
				files: action.fileDel
			});
		case types.GETFILE:
			return Object.assign({}, state, {
				getFile: true
			});
		case types.DONEGET:
			return Object.assign({}, state, {
				getFile: false
			});
		case types.UPLOAD_FAILED:
			return Object.assign({}, state, {
				errorUploadFile: action.errUpload,
				getFile: false
			});
		case types.GET_FAILED:
			return Object.assign({}, state, {
				errorRetrieveFile: action.errGet,
				getFile: false

			});

		default:
			return state;
	}
}