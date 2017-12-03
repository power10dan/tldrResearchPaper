import * as types from '../Constants/ActionTypes.js';
import { userLoginST } from '../Store/initialStoreState.js';

export default function authentication(state = userLoginST , action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                st_is_logged_in: action.a_is_logged_in,
                st_success_msg: action.a_success_msg
            });

        case types.LOGIN_FAIL:
            return Object.assign({}, state, {
                st_is_logged_in: action.a_is_logged_in,
                st_error_msg: action.a_error_msg
            });

        case types.LOGOUT:
            return Object.assign({}, state, {
                st_is_logged_in: false
            });

        case types.OPEN_DIALOG:
            return Object.assign({}, state,{
                st_is_open_dialog: true
            });


        case types.CLOSE_DIALOG:
            return Object.assign({}, state, {
                st_is_open_dialog: false
            });
        default:
            return state;
    }
}
