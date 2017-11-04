import * as types from '../Constants/ActionTypes';

export function DialogOpen(){
	return {
		type: types.OPEN_DIALOG,
		isDialogOpen: true
	}
}

export function DialogClose(){
	return {
		type: types.CLOSE_DIALOG,
		isDialogOpen: false
	}
}