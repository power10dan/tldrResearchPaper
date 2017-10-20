import React  from 'react';
import AppTopBar from '../AppComponents/AppTopBar.js';
import Button from 'material-ui/Button';

class UploadFile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			file: null
		};
	}

	handleClick = (fileObj) =>{
    		var fileName = fileObj.fileList[0].name;
		var djangoURL = "http://127.0.0.1:8000/api/uploadFile/".concat(fileName);
		var blob = fileObj.base64;
		this.uploadFiles(djangoURL, blob);
	}

	uploadFiles = (url, file) => {
		  var jsonData = file;
		  console.log(jsonData);
		//var jsonObj = JSON.parse(jsonData)
		fetch(url, {
			method: 'post',
			body: jsonData ,
			dataType: 'json',
			mode: 'cors',
			headers: {
        	    'Content-Type': 'application/json'
        	}
		}).then((response) => {
			  console.log(response.status);
			  return response.status;
		}).then((data)=>{
			  console.log("data");
		}).catch((err)=>{
			  console.log(err);
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
