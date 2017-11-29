import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import tldrApp from "../Features/Common/root.js";
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

// apply redux thunk here
export const store = createStore(
	tldrApp,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);

console.log(store.getState())
