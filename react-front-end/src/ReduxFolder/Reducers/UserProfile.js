import * as types from '../Constants/ActionTypes';
import { userProfileST } from '../Store/initialStoreState.js';

export default function userProfileReducer(state = userProfileST, action){
	switch(action.type){
		case types.SAVE_ACC:
			return Object.assign({}, state, {
          st_username: action.a_username,
          st_user_email: action.a_user_email,
				  st_token: action.a_token
			});

		default:
			return state;
	}
}
