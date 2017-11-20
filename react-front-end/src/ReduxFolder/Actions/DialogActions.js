import * as types from '../Constants/ActionTypes';

export function dialogOpenAction(){
	return {
		type: types.OPEN_DIALOG
	};
}

export function dialogCloseAction(){
	return {
		type: types.CLOSE_DIALOG
	};
}

export function dialogOpenCreateAction(){
	return {
		type: types.OPEN_CREATE_DIALOG
	};
}
export function dialogCloseCreateAction(){
	return {
		type: types.CLOSE_CREATE_DIALOG
	};
}
