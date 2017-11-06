import isLoadingReducer from "./isLoadingReducer";
import authentication from "./authentication";
import createAccReducer from "./createAccReducer";
import UserProfile from "./UserProfile";
import { combineReducers } from 'redux';

const tldrApp = combineReducers({
    createAccReducer,
    isLoadingReducer,
    authentication,
    UserProfile
});

export default tldrApp;
