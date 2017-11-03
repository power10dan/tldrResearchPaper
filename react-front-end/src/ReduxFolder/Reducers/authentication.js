import * as types from '../Constants/ActionTypes.js';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

function authentication(state = initialState, action) {
    switch (action.type) {
    case types.REQUEST:
        return {
            loggingIn: true,
            user: action.user
        };
    case types.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            user: action.user
        };
    case types.LOGIN_FAIL:
        return {};
    case types.LOGOUT:
        return {};
    default:
        return state;
    }
}

export default authentication;
