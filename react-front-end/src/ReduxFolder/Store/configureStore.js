import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import tldrApp from "../Reducers/root";
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
