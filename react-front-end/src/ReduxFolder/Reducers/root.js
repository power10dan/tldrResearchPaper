import loginReducer from "./LoginReducer.js";
import isLoading from "./isLoadingReducer.js";
import combineReducers from 'redux';

const loggerMiddleware = createLogger();

const tldrApp = combineReducers(
	loginReducer,
    isLoadingReducer
);

export default tldrApp;