import isLoadingReducer from "./isLoadingReducer";
import authentication from "./authentication";
import openDialog from "./DialogReducer.js";
import { combineReducers } from 'redux';

const tldrApp = combineReducers({
    isLoadingReducer,
    authentication,
    openDialog
});

export default tldrApp;
