import * as types from '../Constants/ActionTypes';

export function saveCredAction(a_username, a_user_email, a_key){
	return{
		type: types.SAVE_ACC,
      a_username: a_username,
      a_user_email: a_user_email,
		  a_token: a_key
	};
}
