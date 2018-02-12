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

export const GetFileHeader = ()=>{
	var form = new FormData();
	form.append("file", "");
	let dispatchHeader = {
		method: 'GET',
		headers:{
			"async": true,
			"crossDomain": true,
			"method": "GET",
			"headers": {
			  "Cache-Control": "no-cache",
			  "Postman-Token": "dd2aaa60-3b82-3fec-c97e-b0f606e2108d"
			},
			"processData": false,
			"contentType": false,
			"mimeType": "multipart/form-data",
			"data": form
		},
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
	var form = new FormData();
	form.append("filename", paperContent.filename);
	form.append("tempfile", paperContent.tempfile);

	let dispatchHeader = {
		"async": true,
		 "crossDomain": true,
		 "method": "POST",
		  "headers": {
		    "Cache-Control": "no-cache",
   			"Postman-Token": "4328a6de-f86c-eb0c-8bed-fc79e1879edd"
		  },
		  "processData": false,
		  "contentType": false,
		  "mimeType": "multipart/form-data",
		  "data": form
	}

	return dispatchHeader;
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




