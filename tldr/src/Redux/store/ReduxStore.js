import { createStore } from 'redux';
import tldrApp from '../Reducers/AppReducers.js';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

let store = createStore(
	tldrApp,
	applyMiddleware(
		loggerMiddleware,
		thunkMiddleware
	)
);

console.log(store.getState());
export default store;