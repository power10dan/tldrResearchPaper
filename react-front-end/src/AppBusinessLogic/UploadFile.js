import React  from 'react';
import AppTopBar from '../AppComponents/AppTopBar.js';
import Button from 'material-ui/Button';

class UploadFile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			file: null,
		};
	}

	handleClick = (fileObj) =>{
		//console.log(fileObj.fileList[0])
		var djangoURL = "http://127.0.0.1:8000/api/uploadFile/".concat("test.pdf");
		var blob = fileObj.base64;
		this.uploadFiles(djangoURL, blob);
	}

	uploadFiles = (url, file) => {
		var jsonData = file 
		console.log(jsonData)
		//var jsonObj = JSON.parse(jsonData)
		fetch(url, {
			method: 'post',
			body: jsonData ,
			dataType: 'json',
			mode: 'no-cors',
			headers: {
        	    'Content-Type': 'application/json',
        	}
		}).then((response) => {
			console.log(response)
			return response.json();

		}).then((data)=>{
			console.log("data")
		}).catch((err)=>{
			console.log(err)
		});
	}
 

	render(){
		return(
			<AppTopBar  uploadFile={this.handleClick} />
		);
	}
}

export default UploadFile;