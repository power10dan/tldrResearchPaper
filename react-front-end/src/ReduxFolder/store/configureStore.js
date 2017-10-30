import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import tldrApp from "../Reducers/reducer.js";

// apply redux thunk here
const store = createStore(
	tldrApp,
	applyMiddleware(
		thunkMiddleware

	)
)
