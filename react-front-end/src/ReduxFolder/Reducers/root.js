import isLoadingReducer from "./isLoadingReducer";
import authentication from "./authentication";
import createAccReducer from "./createAccReducer";
import userProfileReducer from "./UserProfile";
import genStateReducer from "./fileReducers";
import { combineReducers } from 'redux';

const tldrApp = combineReducers({
    createAccReducer,
    isLoadingReducer,
    authentication,
    userProfileReducer,
    genStateReducer
});

export default tldrApp;
