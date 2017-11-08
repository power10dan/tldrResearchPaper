import * as types from '../Constants/ActionTypes';
import { generalState } from '../Store/initialStoreState.js';

export default function genStateReducer(state = generalState, action) {
    switch (action.type) {

        // we replace all the files in the current state with the new list
        // TODO: append only the new files, or use a Set to just insert in log n
        // time
    case types.GETFILE:
        return Object.assign({}, state, {
            files: action.files
        });
    case types.UPLOADFILE:
        return Object.assign({}, state, {
            files:action.fileInfo,
            successMess: action.successMessage
        });

    case types.DELETEFILE:
       return Object.assign({}, state, {
            files: action.fileDel
        });
    case types.GETFILE:
        return Object.assign({}, state, {
            getFile: true
        });
    case types.DONEGET:
        return Object.assign({}, state, {
            getFile: false
        });
    case types.UPLOAD_FAILED:
        return Object.assign({}, state, {
            errorUploadFile: action.errUpload,
            getFile: false
        });
    case types.GET_FAILED:
       return Object.assign({}, state, {
            errorRetrieveFile: action.errGet,
            getFile: false

        });

    default:
        return state;
    }
};
