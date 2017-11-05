import * as types from '../Constants/ActionTypes';
import { LogInFailed, isLoading} from './actions.js';

function _createProfile(userName, password, userEmail) {
    // set the request options
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userName, password, userEmail}),
    };

    // set the url and use fetch to send request
    let url = "http://127.0.0.1:8000/rest-auth/registration/";
    return fetch(url, {
			method: 'post',
			body: JSON.stringify({userName, password, userEmail}),
			dataType: "json",
			mode: "cors",
			headers: {
        	    'Content-Type': 'application/json',
        	}
		});
}

export function createProfile(userName, passWord, userEmail){
	return dispatch => {
		_createProfile(userName, passWord, userEmail).then((response) => {
			let resp = [response.json(), response.status];
			return resp
		}).then((data)=>{
			if(data[1] === 400){
				this.setState({notLogState: true})
			}

			if(data[1] === 200){
				this.setState({notLogState: false});
			}

			console.log(data)
		}).catch((err) =>{
			if(err.message === "Failed to fetch"){
                dispatch(LogInFailed("Server Connection Refused, Please Contact Your System Admin"));
                dispatch(isLoading(false));
            }
		});
	};
}

