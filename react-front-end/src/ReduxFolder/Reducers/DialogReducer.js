import * as types from '../Constants/ActionTypes';

export default function openDialog(state = {}, action){
	switch(action.type){
		case types.OPEN_DIALOG:
			return Object.assign({}, state, {
                isOpenDialog: true
            });
        case types.CLOSE_DIALOG:
			return  Object.assign({}, state, {
                isOpenDialog: false
            });

		default:
			return state;
	}
}