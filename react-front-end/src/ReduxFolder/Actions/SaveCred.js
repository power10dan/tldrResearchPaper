import * as types from '../Constants/ActionTypes';

export function saveCred(userName, userEmail, key){
	return{
		type: types.SAVE_ACC,
		userAcc: userName,
		email: userEmail,
		token: key
	};
}