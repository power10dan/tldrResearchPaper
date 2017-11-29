import * as types from '../Common/Constants/ActionTypes';
import { generalState } from '../../Store/initialStoreState.js';

export default function genStateReducer(state = generalState, action) {
    switch (action.type) {
        case types.GETFILE:
            return Object.assign({}, state, {
                files: action.files
            });
        case types.UPLOADFILE:
            return Object.assign({}, state, {
                successMess: action.successMessage,
                errorUploadFile: ""
            });

        case types.GETPDFSUCCESS:
            return Object.assign({}, state, {
                successMess: action.successMessage,
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
                successMess: "",
                getFile: false
            });
        case types.GET_FAILED:
           return Object.assign({}, state, {
                errorRetrieveFile: action.errGet,
                getFile: false

            });
        case types.DIALOG_OP:
            return Object.assign({}, state, {
                opDialog: true
            })
        case types.DIALOG_CL:
            return Object.assign({}, state, {
                opDialog: false
            })

        default:
            return state;
    }
};
