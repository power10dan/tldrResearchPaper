import * as types from '../Constants/ActionTypes';
import { LogInFailed, isLoading} from './actions.js';

function _createProfile(username, password1, password2, account_emailaddress) {
    // // set the request options
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({  username
    //                           , password1
    //                           , password2
    //                           , account_emailaddress
    //                          })
    // };

    // console.log(requestOptions);
    // set the url and use fetch to send request
    let url = "http://127.0.0.1:8000/rest-auth/registration/";
    let request = {
			  method: 'post',
			  body: JSON.stringify({ username, 
                               account_emailaddress, 
                               password1, 
                               password2
                            }),
			  headers: {
        	  'Content-Type': 'application/json'
        }
		};
    
    return fetch(url, request);
}

export function createProfile(userName, passWord, passWord2, userEmail){
	return dispatch => {
		  _createProfile(userName, passWord, passWord2, userEmail)
          .then((response) => {
			        let resp = [response.json(), response.status];
			        return resp;
		      }).then((data)=>{
			        if(data[1] === 400){
				          this.setState({notLogState: true});
                  dispatch(LogInFailed("Bad Request Error, Please Contact Your System Admin."));
			        }

			        if(data[1] === 200){
				          this.setState({notLogState: false});
                   dispatch(LogInFailed("User Profile Created!"));
			        }
              
			        console.log(data)
		      }).catch((err) =>{
			        if(err.message === "Failed to fetch"){
                  dispatch(LogInFailed(
                      "Server Connection Refused, Please Contact Your System Admin"));
                  dispatch(isLoading(false));
              }
		      });
	};
}

