import * as types from '../../ReduxFolder/Constants/ActionTypes';
import * as actions from '../../ReduxFolder/Actions/actions';

describe('actions', () => {
    it('create an action to upload a file', () => {
        const text = 'fileToUpload';
        const expectedAction = {
            type: types.UPLOADFILE,
            fileInfo: text
        };
        expect(actions.UploadFile(text)).toEqual(expectedAction);
    });

    it('should create an action to delete a file', () => {
        const text = 'fileToDelete';
        const expectedAction = {
            type: types.DELETEFILE,
            fileDel: text
        };
        expect(actions.DeleteFile(text)).toEqual(expectedAction);
    });


    it('should create an action to show loading stats', () => {
        const text = 'stats';
        const expectedAction = {
            type: types.LOADING,
            isLoading: text
        };
        expect(actions.isLoading(text)).toEqual(expectedAction);
    });

    it('should create an action to show login success', () => {
        const text = true;
        const expectedAction = {
            type: types.LOGIN_SUCCESS,
            isLogin: text
        };
        expect(actions.LogInSuccess(text)).toEqual(expectedAction);
    });

    it('should create an action to show Log In Failure', () => {
        const text = false;
        const message = "I failed at logging in";
        const expectedAction = {
            type: types.LOGIN_FAIL,
            isLogin: text,
            message: message
        };
        expect(actions.LogInFailed(message)).toEqual(expectedAction);
    });

    // TODO figure out async login testing
});
