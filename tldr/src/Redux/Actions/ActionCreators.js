import * as actionTypes from './ActionConstants.js';

export const CachedPaperActionCreator = (actionType, dataPayload) =>{
	let actionPayLoad = {};
	if(actionType === actionTypes.CACHED_PAPERS){
		if("forename" in  dataPayload
			&& "surname" in  dataPayload 
			&& "title" in  dataPayload 
			&& "id" in dataPayload
			&& "pgid" in dataPayload){

			actionPayLoad = {
				type: actionType,
				data: dataPayload
			};

			return actionPayLoad;
		} else {
			return false;
		}
	} else {
		actionPayLoad = {types: actionType, data: dataPayload};
		return actionPayLoad;
	}
}

export const AppStateActionCreator = (actionType, newPayLoad) =>{
	return {type: actionType, dataPayload: newPayLoad};
}