import * as types from '../Constants/ActionTypes.js';

//let user = JSON.parse(localStorage.getItem('user'));
const initialState =  { loggedIn: false, errorMessage: " "} 

function authentication(state = initialState, action) {
    switch (action.type) {
        case types.REQUEST:
            return {
                loggedIn: action.isLogin,
                user: action.user,
                pass: action.pass
            };
        case types.LOGIN_SUCCESS:
            return {
                loggedIn: action.isLogin,
                successMessage: action.message
            };
        case types.LOGIN_FAIL:
            return {
                loggedIn: action.isLogin,
                errorMessage: action.message,

            };
        case types.LOGOUT:
            return {
                loggedIn: action.isLogin,
            };
        default:
            return state;
    }
}

export default authentication;
