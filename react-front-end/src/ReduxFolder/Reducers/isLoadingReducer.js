import {LOADING} from '../Constants/ActionTypes';

// a reducer to update the loading status
export default function isLoadingReducer(state = {}, action) {
    switch (action.type){
        case LOADING:
            return Object.assign({}, state, {
                isLoading: action.isLoading
            });

    	default:
        	return state;
    }
}

