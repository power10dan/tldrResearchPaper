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

    default:
        return state;
    }
};
