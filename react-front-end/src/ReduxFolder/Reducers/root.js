import loginReducer from "./LoginReducer.js";
import isLoadingReducer from "./isLoadingReducer.js";
import authentication from "./authentication"
import { combineReducers } from 'redux';

const tldrApp = combineReducers({
	  loginReducer,
    isLoadingReducer,
    authentication
});

export default tldrApp;
