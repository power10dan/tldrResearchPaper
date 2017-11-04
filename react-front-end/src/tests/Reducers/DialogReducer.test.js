import openDialog from '../../ReduxFolder/Reducers/DialogReducer.js';

const initialState = {};

describe('Login Reducer', () => {
    it('should return an initial state', () => {
        expect(openDialog({}, {type: "NOTVALID"})).toEqual(initialState);
    });

    it('should flip open Dialog to true', () => {
        const output = {isOpenDialog: true};
        expect(openDialog({}, {type: "OPEN_DIALOG"})).toEqual(output);
    });

    it('should flip open Dialog to false', () => {
        const output = {isOpenDialog: false};
        expect(openDialog({}, {type: "CLOSE_DIALOG"})).toEqual(output);
    });
});
