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
 *      logIn: {
            logStatus: false,
            errMessage: " "
        },
        isLoading: false
 *  }
 * 
 *
 */

// our state tree
const initialState = {
    logIn: {
        logStatus: false,
        errMessage: " ",
    },

    isLoading: false,
};

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

// a reducer to update the loading status
function isLoadingReducer(state = initialState, action){
    switch (action.type){
        case LOADING:
            return Object.assign({}, state, {
                isLoading: action.isLoading, 
            });
    }
}


//function fileUpload(state = initialState, action) {
 //   switch (action.type) {

        /* if we have an action to upload a file then we create an newstate that
         * holds the relevant file information
         */
//       case UPLOADFILE:
//            return Object.assign({}, state, {
//                fileUploaded: [
//                   ...state.fileUploaded,
//                    {
//                        FileName: action.fileInfo.FileName,
//                        Path: action.fileInfo.Path,
//                        PathXML: action.fileInfo.PathXML
//                    }
//                ]
//            });

//    default:
//        return state;
//    }
//}

const tldrApp = combineReducers({
    loginReducer,
    isLoadingReducer
});

export default tldrApp;
