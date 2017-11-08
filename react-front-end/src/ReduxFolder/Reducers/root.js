import isLoadingReducer from "./isLoadingReducer";
import authentication from "./authentication";
import createAccReducer from "./createAccReducer";
import UserProfile from "./UserProfile";
import genStateReducer from "./fileReducers";
import { combineReducers } from 'redux';

const tldrApp = combineReducers({
    createAccReducer,
    isLoadingReducer,
    authentication,
    UserProfile,
    genStateReducer
});

export default tldrApp;
