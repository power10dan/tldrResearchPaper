import * as types from '../Common/Constants/ActionTypes.js';
import { userLogin } from '../../Store/initialStoreState.js';

export default function authentication(state = userLogin , action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoggedIn: action.isLogin,
                successMess: action.successMessage
            });

        case types.LOGIN_FAIL:
            return Object.assign({}, state, {
                isLoggedIn: action.isLogin,
                errorMessage: action.message
            });

        case types.LOGOUT:
            return Object.assign({}, state, {
                loggedIn: false
            });
        case types.OPEN_DIALOG:
            return Object.assign({}, state,{
                isOpenDialog: true
            });


        case types.CLOSE_DIALOG:
            return Object.assign({}, state, {
                isOpenDialog: false
            })
        default:
            return state;
    }
}
