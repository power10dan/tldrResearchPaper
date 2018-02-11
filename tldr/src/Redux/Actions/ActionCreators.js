import * as actionTypes from './ActionConstants.js';
import {
          GetChildrenUnionHeader, 
          GetChildrenIntersectionHeader,
          GetNumNodeHeader,
          UploadFileHeader
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
				});
			}).catch((err)=>{
		 	   console.log(err);
			})
	}

}

export const FetchPapers = (url, paperId, paperTitle, actionType)=>{
	return dispatch =>{
		FetchPaperChildren(url, paperId, paperTitle)
		.then((response)=>{
			return response.json();
		}).then((res)=>{
			let titleChildrenPair = {title: paperTitle, children: res};
			dispatch(CachedPaperActionCreator(actionType, titleChildrenPair));
		}).catch((err)=>{
			console.log(err);
		});
	}
}

const UploadPaperFunc = (url, filePayLoad)=>{
	let uploadFileHeader = UploadFileHeader(filePayLoad);
	return fetch(url, filePayLoad);
}

export const UploadNewPaper = (url, fileToUpload)=>{
	console.log(fileToUpload)
	return dispatch => {
		 var FormData = require('form-data');
	     var form = new FormData();
	     form.append('filename', fileToUpload.filename);
	     form.append('file', fileToUpload.tempfile);
	     UploadPaperFunc(url, {
	          method: 'POST',
	          headers: {
	              mode:'cors'
	          },
	          body: form}
	      )
	     .then((response)=>{
	     	console.log(response)
	        if(response.ok){
	            return response;
	        }
	      }).catch((err)=>{
	        console.log(err);
	      });
	}
}