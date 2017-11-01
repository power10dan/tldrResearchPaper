import  {
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../Constants/ActionTypes';

/* The login reducer dispatches actions given a previous state, and returns a
 * new state that performs the actions on the previous state
 */
function loginReducer(state = {}, action) {
    switch (action.type) {
        // if login checks out, we update the loginStatus state tree
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                logIn: {logStatus: action.isLogin}
            });

        // if login fails, we update the logStatus tree and save the 
        // error message
        case LOGIN_FAIL:
            return Object.assign({}, state, {
                logIn: { 
                         logStatus: action.isLogin,
                         errMessage: action.message.
                }
            }); 
        // default to returning initial state if none of these actions
        // apply
        default:
            return state;
    }

    return state;
}

export default loginReducer;