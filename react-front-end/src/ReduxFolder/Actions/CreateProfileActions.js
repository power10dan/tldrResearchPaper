import * as types from '../Constants/ActionTypes';
import { LogInFailed, isLoading, CreateAcc} from './actions.js';

function _createProfile(username, password1, password2, account_emailaddress) {
    let url = "http://127.0.0.1:8000/rest-auth/registration/";
    let request = {
			  method: 'post',
			  body: JSON.stringify({ username
                               , account_emailaddress
                               , password1
                               , password2
                             }),
			  headers: {
        	  'Content-Type': 'application/json'
        }
		};
    console.log('Req: ');
    console.log(request);
    return fetch(url, request);
}

export function createProfile(userName, passWord, passWord2, userEmail){
	return dispatch => {
		  _createProfile(userName, passWord, passWord2, userEmail)
          .then((response) => {
			        let resp = [response.json(), response.status];
			        return resp;
		      }).then((data)=>{
              let ret = {};

			        if(data[1] === 400){
                  ret = CreateAcc(false);
			        }

			        if(data[1] === 201){
                  ret = CreateAcc(true);
			        }
              
              console.log("Data: ")
			        console.log(data)

              // dispatch the new action to handle a registered user
              dispatch(ret);

		      }).catch((err) =>{
			        if(err.message === "Failed to fetch"){
                  dispatch(LogInFailed(
                      "Server Connection Refused, Please Contact Your System Admin"));
                  dispatch(isLoading(false));
              }
		      });
	};
}
