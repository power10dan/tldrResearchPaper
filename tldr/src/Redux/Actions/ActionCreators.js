import * as actionTypes from './ActionConstants.js';
import {
          GetChildrenUnionHeader, 
          GetNumNodeHeader,
          GetFileHeader

        } from '../../AppBusinessLogic/FileOperations.js';
import fetchStream from 'fetch-readablestream';

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
				res.forEach((elem) =>{
					dispatch(CachedPaperActionCreator(actionTypes.CACHED_PAPERS, elem));
				});
			}).catch((err)=>{
		 	   console.log(err);
			})
	}

}

const DownloadPaper = (url)=>{
	return fetchStream(url, GetFileHeader());
}

const readChunk = (readableStream)=>{
	const reader = readableStream.getReader();
	const chunks = [];

	const pump = ()=>{
		return reader.read().then(({ value, done})=>{
			if(done){
				return chunks;
			}

			chunks.push(value);
			return pump();
		});
	}

	return pump();
}

export const downloadPaper = (url, title)=>{
	return dispatch =>{
		DownloadPaper(url)
		.then((response)=>{
			// because we are receiving a ReadableStream
			// object, we have to parse the object
			// first before returning
			return readChunk(response.body);
		}).then((data)=>{
			// we use file-saver api to save
			// the pdf uint8array objects
			// into a blob using Blob.js,
			// then convert it into a PDF
			// using file-saver
			let FileSaver = require('file-saver');
			let blob = new Blob(data, {type: "application/pdf"});
			FileSaver.saveAs(blob, title);
		}).catch((err)=>{
			console.log(err)
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
	return fetch(url, filePayLoad);
}

export const UploadNewPaper = (url, fileToUpload)=>{
	return dispatch => {
		 dispatch(AppStateActionCreator(actionTypes.APP_ISLOADING, true));
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
	     	dispatch(AppStateActionCreator(actionTypes.APP_ISLOADING, false));
	        if(response.ok){
	            return response;
	        }
	      }).catch((err)=>{
	        console.log(err);
	      });
	}
}