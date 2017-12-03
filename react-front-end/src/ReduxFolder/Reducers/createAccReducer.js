import * as types from '../Constants/ActionTypes';
import { createProfileST }from '../Store/initialStoreState.js';

export default function register(state = createProfileST, action){
	  switch(action.type){
            case types.FAIL_CREATE:
            	return Object.assign({}, state, {
            		  st_is_registered: false,
            		  st_prf_err_msg: action.a_prf_err_msg,
                  st_prf_success_msg: " ",
                  st_dismiss_prf_dialog: false
            	});

            case types.CREATE_SUCCESS:
            	return Object.assign({}, state, {
            		  st_is_registered: true,
            		  st_prf_err_msg: "",
            		  st_prf_success_msg: action.a_prf_success_msg,
                  st_dismiss_prf_dialog: true
            	});
            case types.OPEN_CREATE_DIALOG:
                return Object.assign({}, state, {
                    st_is_open_dialog: true
                });

            case types.CLOSE_CREATE_DIALOG:
                return Object.assign({}, state, {
                    st_is_open_dialog: false
                });

    		default:
    			return state;
	  }
}
