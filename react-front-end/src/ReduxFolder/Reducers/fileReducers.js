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
                st_files: action.a_files,
                st_file_names: action.a_files.map(elem => elem.FILES.fileName)
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
            let new_dl_set = new Set(state.st_dl_file_names);
            let file_name = action.a_dl_file_name;

            // if state has the file then we delete it from the set
            if (new_dl_set.has(file_name)) {
                new_dl_set.delete(file_name);

            // If state does not have the file then we add it
            } else {
                new_dl_set.add(file_name);
            }
            // now return by combining the new set into the state object
                return Object.assign({}, state, {
                    st_dl_file_names: new Set(new_dl_set)
            });
    case types.PACK_SUMMARIES:
        // munge the data properly
        let tmp = {}; // a tmp object to use if we find a match

        // iterate over all the file names we have, if we find a file name that
        // matches for the summaries then munge this crappy data structure into
        // something more manageable
        for (var i = 0; i < state.st_files.length; i++) {
            if (state.st_files[i].FILES.fileName === action.a_file_name) {
                tmp.title         = state.st_files[i].FILES.title;
                tmp.author        = state.st_files[i].FILES.author;
                tmp.file_name     = state.st_files[i].FILES.fileName;
                tmp.section_summs = action.a_file_summs;
            };
        }

        // do a shallow copy of the old state
        let better_file_data = state.st_file_summs.slice();

        // if tmp is not empty, then we add the good object to the better array
        if (!_.isEmpty(tmp)) {
            better_file_data.push(tmp);
        }

        // now update state
        return Object.assign({}, state, {
            st_file_summs: better_file_data
        });


        default:
            return state;
    }
};
