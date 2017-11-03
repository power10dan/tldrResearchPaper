import  {
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../Constants/ActionTypes';

// init the local storage
// import { LocalStorage } from 'node-localstorage';
// let localStorage = new LocalStorage('./scratch');

localStorage.setItem('user', JSON.stringify({ "user": "a simple user"}));

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

/* The login reducer dispatches actions given a previous state, and returns a
 * new state that performs the actions on the previous state
 */
function loginReducer(state = initialState, action) {
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
                         errMessage: action.message
                }
            });
        // default to returning initial state if none of these actions
        // apply
        default:
            return state;
    }
}

export default loginReducer;
