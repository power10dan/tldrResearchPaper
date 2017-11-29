import isLoadingReducer from "./Reducers/Loading_Reducer";
import authentication from "../Login/Login_Reducer";
import createAccReducer from "../CreateUser/CreateUser_Reducer";
import UserProfile from "./Reducers/UserProfile_Reducer";
import genStateReducer from "../UploadFile/UploadFile_Reducer";
import { combineReducers } from 'redux';

const tldrApp = combineReducers({
    createAccReducer,
    isLoadingReducer,
    authentication,
    UserProfile,
    genStateReducer
});

export default tldrApp;
