import {LOADING} from '../Constants/ActionTypes';
import { isLoading } from '../Store/initialStoreState.js';

// a reducer to update the loading status
export default function isLoadingReducer(state = isLoading , action) {
    switch (action.type){
        case LOADING:
            return Object.assign({}, state, {
                isLoad: action.isLoading
            });

    	default:
        	return state;
    }
}

