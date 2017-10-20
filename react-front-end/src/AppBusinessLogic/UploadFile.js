import React  from 'react';
import AppTopBar from '../AppComponents/AppTopBar.js';
import Button from 'material-ui/Button';

class UploadFile extends React.Component{
	constructor(props){
		super(props);
	}

	handleClick = (fileObj) => {
		var fileName = fileObj.fileList[0].name;
		var djangoURL = "http://127.0.0.1:8000/api/uploadFile/".concat(fileName);
		var djangoGETURL = "http://127.0.0.1:8000/api/getAllFiles/"
		this.uploadFiles(djangoURL, djangoGETURL, fileObj.base64);
		
	}

	uploadFiles = (urlPOST, urlGET, file) => {
		var jsonData =  file
		fetch(urlPOST, {
			method: 'post',
			body: jsonData ,
			dataType: 'json',
			mode: 'no-cors',
			headers: {
        	    'Content-Type': 'application/json',
        	}
		}).then((response) => {
			this.getAllFiles(urlGET);
		}).then((data)=>{
			console.log("data")
		}).catch((err)=>{
			console.log(err)
		});
	}

	getAllFiles = ( url ) =>{
		var myInit = {
			method: 'get',
		};
		fetch(url, myInit).then((response) =>{
			
			return response.json()
		}).then((data) =>{
			console.log(data);


		}).catch((err) =>{
			console.log(err);
		})
	}
 
	render(){
		return(
			<AppTopBar  uploadFile={this.handleClick} />
		);
	}
}

export default UploadFile;