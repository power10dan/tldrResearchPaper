import isLoadingReducer from "./isLoadingReducer";
import authentication from "./authentication";
import openDialog from "./DialogReducer.js";
import createAccReducer from "./createAccReducer";
import { combineReducers } from 'redux';

const tldrApp = combineReducers({
    createAccReducer,
    isLoadingReducer,
    authentication,
    openDialog
});

export default tldrApp;
