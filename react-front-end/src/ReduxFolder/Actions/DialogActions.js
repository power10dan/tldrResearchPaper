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