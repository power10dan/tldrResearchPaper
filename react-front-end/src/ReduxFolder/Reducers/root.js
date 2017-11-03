import loginReducer from "./LoginReducer";
import isLoadingReducer from "./isLoadingReducer";
import authentication from "./authentication";
import { combineReducers } from 'redux';

const tldrApp = combineReducers({
	  loginReducer,
    isLoadingReducer,
    authentication
});

export default tldrApp;
