import * as actionTypes from './ActionConstants.js';
import {
          GetChildrenUnionHeader, 
          GetChildrenIntersectionHeader,
          GetNumNodeHeader,
          UploadFile
        } from '../../AppBusinessLogic/FileOperations.js';

export const CachedPaperActionCreator = (actionType, dataPayload) =>{
	let actionPayLoad = {};
	actionPayLoad = {type: actionType, data: dataPayload};
	return actionPayLoad;
}

export const AppStateActionCreator = (actionType, newPayLoad) =>{
	return {type: actionType, dataPayload: newPayLoad};
}

const FetchPaperChildren= (url, paperId, paperTitle)=>{
	return fetch(url, GetChildrenUnionHeader(paperId, paperTitle));
}

const FetchNumNodes = (url, numNode)=>{
	return fetch(url, GetNumNodeHeader(numNode));

}

export const FetchNumberNodes = (url, numNode)=>{
	return dispatch =>{
		FetchNumNodes(url, numNode)
			.then((response)=>{
				return response.json();
			}).then((res)=>{
				res.map(elem=>{
					dispatch(CachedPaperActionCreator(actionTypes.CACHED_PAPERS, elem));
				})
				
			}).catch((err)=>{
		 	   console.log(err);
			})
	}

}

export const FetchPapers = (url, paperId, paperTitle)=>{
	return dispatch =>{
		FetchPaperChildren(url, paperId, paperTitle)
		.then((response)=>{
			return response.json();
		}).then((res)=>{
			res.map(elem=>{
				dispatch(
					CachedPaperActionCreator( actionTypes.CACHED_PAPERS, elem)
				);
			});
		}).catch((err)=>{
			console.log(err);
		});
	}
}

const UploadPaper = (url, filePayLoad)=>{
	return fetch(url, UploadPaper(filePayLoad));
}

export const UploadNewPaper = (url, fileToUpload)=>{
	return dispatch => {
		UploadPaper(url, fileToUpload)
			.then((response)=>{
				if(response.ok){
					return response.json();
				}
			}).catch((err)=>{
				console.log(err);
			});
	}
}