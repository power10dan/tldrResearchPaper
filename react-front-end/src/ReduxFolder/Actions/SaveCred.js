import * as types from '../Constants/ActionTypes';

export function saveCredAction(a_username, a_user_email, a_key){
	return{
		type: types.SAVE_ACC,
		userAcc: a_username,
		email: a_user_email,
		token: a_key
	};
}
