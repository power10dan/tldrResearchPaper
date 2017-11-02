import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import tldrApp from "../Reducers/reducer.js";
import { createLogger } from 'redux-logger';


const loggerMiddleware = createLogger();
// apply redux thunk here
export default const store = createStore(
	tldrApp,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);
