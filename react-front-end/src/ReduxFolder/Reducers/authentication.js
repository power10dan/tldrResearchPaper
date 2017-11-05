import * as types from '../Constants/ActionTypes.js';

//let user = JSON.parse(localStorage.getItem('user'));
const initialState =  { loggedIn: false, errorMessage: " "} 

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case types.REQUEST:
        return Object.assign({}, state, {
            loggedIn: action.isLogin,
            user: action.user,
            pass: action.pass
        });

        case types.LOGIN_SUCCESS:
        return Object.assign({}, state, {
            loggedIn: action.isLogin,
            successMessage: action.message
        });

        case types.LOGIN_FAIL:
        return Object.assign({}, state, {
            loggedIn: action.isLogin,
            errorMessage: action.message
        });

        case types.LOGOUT:
        return Object.assign({}, state, {
            loggedIn: false
        });

        default:
            return state;
    }
}
