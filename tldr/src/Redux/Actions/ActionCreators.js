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

const FetchPaperChildren= (url)=>{
	return fetch(url);
}

export const FetchPapers = (url)=>{
	return dispatch =>{
		FetchPaperChildren(url)
		.then((response)=>{
			if(response.ok){
				return response.json();
			}
		}).then((data)=>{
			data.forEach((elem)=>{
				dispatch(CachedPaperActionCreator(
						actionTypes.CACHED_PAPERS,
						elem 
				));
			});
		}).catch((err)=>{
			console.log(err);
		});
	}
}

const UploadPaper = (url)=>{
	return fetch(url);
}

export const UploadNewPaper = (url)=>{
	return dispatch =>{
		UploadPaper(url)
			.then((response)=>{
				if(response.ok){
					return response.json();
				}
			}).catch((err)=>{
				console.log(err);
			});
	}
}