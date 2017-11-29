import * as types from '../Common/Constants/ActionTypes';
import { createProfile }from '../../Store/initialStoreState.js';

export default function register(state = createProfile, action){
	  switch(action.type){
            case types.FAIL_CREATE:
            	return Object.assign({}, state, {
            		isRegistered: false,
            		errorMessageProfile: action.errorMess,
                    successMessageProfile: " ",
                    dismissProfileDialog: false
            	});

            case types.CREATE_SUCCESS:
            	return Object.assign({}, state, {
            		isRegistered: true,
            		errorMessageProfile: " ",
            		successMessageProfile: action.successMessage,
                    dismissProfileDialog: true
            	});
            case types.OPEN_CREATE_DIALOG:
                return Object.assign({}, state, {
                    isOpenDialog: true
                });

            case types.CLOSE_CREATE_DIALOG:
                return Object.assign({}, state, {
                    isOpenDialog: false,
                });
           
    		default:
    			return state;
	  }
}
