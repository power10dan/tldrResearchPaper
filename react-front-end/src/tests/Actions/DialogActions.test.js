import * as types from '../../ReduxFolder/Constants/ActionTypes';
import * as actions from '../../ReduxFolder/Actions/DialogActions';


describe('DialogActions: ', () => {
    it('should return a Open Dialog type', () => {
        expect(actions.DialogOpen()).toEqual({ type: types.OPEN_DIALOG });
    });

    it('should return a Close Dialog type', () => {
        expect(actions.DialogClose()).toEqual({ type: types.CLOSE_DIALOG });
    });
});
