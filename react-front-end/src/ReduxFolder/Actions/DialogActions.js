import * as types from '../Constants/ActionTypes';

export function DialogOpen(){
	return {
		type: types.OPEN_DIALOG,
	}
}

export function DialogClose(){
	return {
		type: types.CLOSE_DIALOG,
	}
}

export function DialogOpenCreate(){
	return {
		type: types.OPEN_CREATE_DIALOG,
	}
}
export function DialogCloseCreate(){
	return {
		type: types.CLOSE_CREATE_DIALOG,
	}
}
