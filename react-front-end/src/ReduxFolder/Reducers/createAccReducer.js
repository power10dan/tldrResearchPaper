import * as types from '../Constants/ActionTypes';

export default function register(state = {}, action){
	  switch(action.type){
		case types.CREATEACC:
			  return Object.assign({}, state, {
            isRegistered: action.registered
        });

		default:
			  return state;
	  }
}
