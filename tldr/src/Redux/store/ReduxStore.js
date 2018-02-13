import { createStore, applyMiddleware} from 'redux';
import tldrApp from '../Reducers/AppReducers.js';
import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';

export const store = createStore(
	tldrApp,
	applyMiddleware(
		thunkMiddleware,
	)
);

console.log(store.getState());