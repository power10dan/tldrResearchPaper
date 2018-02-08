import { createStore, applyMiddleware} from 'redux';
import tldrApp from '../Reducers/AppReducers.js';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

export const store = createStore(
	tldrApp,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware,
	)
);

console.log(store.getState());