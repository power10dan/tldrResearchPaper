import * as types from '../src/ReduxFolder/Constants/ActionTypes';
import * as actions from '../src/ReduxFolder/Actions/actions';

describe('actions', () => {
    it('create an action to upload a file', () => {
        const text = 'fileToUpload';
        const expectedAction = {
            type: types.UPLOADFILE,
            fileInfo: text
        };
        expect(actions.UploadFile(text)).toEqual(expectedAction);
    });
});
