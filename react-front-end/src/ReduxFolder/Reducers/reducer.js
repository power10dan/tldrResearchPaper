import {
    LOGIN,
    FORGOTPass,
    FORGOTACC,
    CREATEACC,
    UPLOADFILE,
    DELETEFILE
} from '../Actions/LoginActions.js';

import {combineReducers} from 'redux';
/*
 *  initial state: { 
 *      userProfile: { 
 *           id: Integer,
 *           isLogin: Boolean,
 *   		 userAcc: Text,
 *           userPass: CryptoHash,
 *
 *      },
 *       fileUploaded: [ { 
 * 				id: Integer, 
 * 				FileName: Text, 
 * 				Path: Text, 
 *  			PathXML: Text 
 *
 *
 *            
 * 		}] ...
 *  }
 * 
 *
 */


/* initial state is an empty state obj. which consists of an empty user and an
 * empty file array
 */ 
const initialState = {
    userProfile: {},
    fileUploaded: []
};


/* The login reducer dispatches actions given a previous state, and returns a
 * new state that performs the actions on the previous state
 */
function loginReducer(state = initialState, action) {
    switch (action.type) {
        /* if we have a Login then we create a new state, by copying the old
         * state and by copying the login information from the action to the
         * new state
         */
        case LOGIN:
            return Object.assign({}, state, {
                isLogin: action.isLogin,
                userAcc: action.account,
                userPass: action.pass
            });

        /* if we have a forgotten password then we grab the recoverEmail input
         * from the action and pass it to the new state
         */
        case FORGOTPass:
            return Object.assign({}, state, {
                userPass: action.recoverEmail
            });

        /* if we have a forgotten account then we grab the recoverEmail input
         * from the action and pass it to the new state.
         */
        case FORGOTACC:
            return Object.assign({}, state, {
                userAcc: action.recoverEmail
            });

        /* if we have fall through then we just do nothing and return the last
         * state
         */
        default:
            return state;
    }

    return state;
}


function fileUpload(state = initialState, action) {
    switch (action.type) {

        /* if we have an action to upload a file then we create an newstate that
         * holds the relevant file information
         */
        case UPLOADFILE:
            return Object.assign({}, state, {
                fileUploaded: [
                    ...state.fileUploaded,
                    {
                        FileName: action.fileInfo.FileName,
                        Path: action.fileInfo.Path,
                        PathXML: action.fileInfo.PathXML
                    }
                ]
            });

    default:
        return state;
    }
}

const tldrApp = combineReducers({
    fileUpload,
    loginReducer
});

export default tldrApp;
