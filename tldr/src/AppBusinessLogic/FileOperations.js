import * as actionTypes from '../Redux/Actions/ActionConstants.js';
import * as actionCreators from '../Redux/Actions/ActionCreators.js';
import { ReducerPapers } from '../Redux/Reducers/AppReducers.js';
import * as appUrls from '../AppUrlConstants.js';

export const GetChildrenUnionHeader = ()=>{
	let dispatchHeader = {
		method: 'GET',
		headers:{
			'Cache-Control': 'no-cache',
			 mode: 'cors',
			'Content-Type': 'application/json'
		},

		formData: {}
	};

	return dispatchHeader;
}

export const GetChildrenIntersectionHeader = ()=>{
	let dispatchHeader = {
		method: 'GET',
		headers:{ 
			'Cache-Control': 'no-cache',
		     mode: 'cors',
		     'Content-Type': 'application/json',
		},
		formData: {}
	};

	return dispatchHeader;
}

export const UploadFileHeader = (paperContent)=>{
	let dispatchHeader = {
		method: 'POST',
		headers:{
			mode: 'cors',
			'Content-Type': 'application/json',
		},
		formData: {file: paperContent}
	}
}

export const GetNumNodeHeader = ()=>{
	let dispatchHeader = {
		method: 'GET',
		headers:{
			mode: 'cors',
			'Content-Type': 'application/json'
		},
	}

	return dispatchHeader;
}




