import * as types from '../Constants/ActionTypes';
import { generalState } from '../Store/initialStoreState.js';

export default function genStateReducer(state = generalState, action) {
    switch (action.type) {
        case types.UPLOADFILE:
            return Object.assign({}, state, {
                st_success_msg: action.a_success_msg,
                st_err_upload: ""
            });

        case types.GETPDFSUCCESS:
            return Object.assign({}, state, {
                st_success_msg: action.a_success_msg
            });

        case types.DELETEFILE:
           return Object.assign({}, state, {
                files: action.a_file_del
            });
        case types.GETFILE:
            return Object.assign({}, state, {
                st_get_file: true,
                st_files: action.a_files
            });
        case types.DONEGET:
            return Object.assign({}, state, {
                st_get_file: false
            });
        case types.UPLOAD_FAILED:
            return Object.assign({}, state, {
                st_err_upload: action.a_err_upload,
                st_success_msg: "",
                st_get_file: false
            });
        case types.GET_FAILED:
           return Object.assign({}, state, {
               st_err_file: action.a_err_file,
               st_get_file: false
            });
        case types.DIALOG_OP:
            return Object.assign({}, state, {
                st_is_open_dialog: true
            });
        case types.DIALOG_CL:
            return Object.assign({}, state, {
                st_is_open_dialog: false
            });
        case types.ADD_PAPER_DL:
            return Object.assign({}, state, {
                st_dl_file_names: st_dl_file_names.push(action.a_dl_file_name)
        });

        default:
            return state;
    }
};
