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

		default:
			return state;
	}
}