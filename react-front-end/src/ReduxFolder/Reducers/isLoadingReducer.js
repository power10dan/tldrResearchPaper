import { LOADING } from '../Constants/ActionTypes';
import { isLoadingST } from '../Store/initialStoreState.js';

// a reducer to update the loading status
export default function isLoadingReducer(state = isLoadingST, action) {
    switch (action.type){
        case LOADING:
            return Object.assign({}, state, {
                st_is_load: action.a_is_load
            });

    	default:
        	return state;
    }
}

