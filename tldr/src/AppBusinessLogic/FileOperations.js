import * as actionTypes from '../Redux/Actions/ActionConstants.js';
import * as actionCreators from '../Redux/Actions/ActionCreators.js';
import { ReducerPapers } from '../Redux/Reducers/AppReducers.js';
import * as appUrls from '../AppUrlConstants.js';

export const GetChildrenUnionHeader = (idOfPaper, titleOfPaper)=>{
	let urlDispatch = appUrls.getChildrenUnion + "/" + "?id=" + id; 
	let dispatchHeader = {
		method: 'GET',
		url: urlDispatch,
		qs:{
			id: [idOfPaper],
			title: titleOfPaper
		},
		headers:{
			'Cache-Control': 'no-cache',
			mode: 'cors',
			'Content-Type': 'application/json'
		},

		formData: {}
	};

	return dispatchHeader;
}

export const GetChildrenIntersectionHeader = (idOfPaper, titleOfPaper)=>{
	let urlDispatch = appUrls.getChildrenIntersection + "/" + "?id=" + idOfPaper;
	let dispatchHeader = {
		method: 'GET',
		url: urlDispatch,
		qs: {
			id: idOfPaper,
			title: titleOfPaper
		},

		headers:{ 

			'Cache-Control': 'no-cache',
		     mode: 'cors',
		     'Content-Type': 'application/json',
		},
		formData: {}
	};

	return dispatchHeader;
}

export const UploadFile = (paperContent)=>{
	let urlDispatch = appUrls.uploadFile + "/";
	let dispatchHeader = {
		method: 'POST',
		url: urlDispatch,
		headers:{
			mode: 'cors',
			'Content-Type': 'application/json',
		},
		formData: {file: paperContent}
	}
}




