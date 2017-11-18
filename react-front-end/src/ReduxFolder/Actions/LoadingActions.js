import * as types from '../Constants/ActionTypes';

// simple actions when app is loading
export function isLoadingAction (a_is_loading_stats){
	return {
		type: types.LOADING,
      a_is_load: a_is_loading_stats
	};
}

