import * as types from '../Constants/ActionTypes';
// simple actions when app is loading
export function isLoading(isLoadingStats){
	return {
		type: types.LOADING,
		isLoading: isLoadingStats
	};
}

