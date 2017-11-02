import loginReducer from "./LoginReducer.js";
import isLoadingReducer from "./isLoadingReducer.js";
import { combineReducers } from 'redux';

const tldrApp = combineReducers({
	  loginReducer,
    isLoadingReducer
});

export default tldrApp;
