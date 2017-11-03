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
});
