import loginReducer from '../../ReduxFolder/Reducers/LoginReducer';

const initialState = {};

describe('Login Reducer', () => {
    it('should return an initial state', () => {
        expect(loginReducer({}, {type: "NOTVALID"})).toEqual(initialState);
    });
});
