import authentication from '../../ReduxFolder/Reducers/authentication.js';

const initialState = {};

describe('Login Reducer: ', () => {
    it('should return an initial state', () => {
        expect(authentication({}, {type: "NOTVALID"})).toEqual(initialState);
    });

    it('should return a logged in user state', () => {
        const output = {loggedIn: true, user: "I'm a user", pass: "pass"};
        expect(authentication({}, { type: "REQUEST"
                                    , isLogin: true
                                    , user: "I'm a user"
                                    , pass: "pass"
                                  })
              ).toEqual(output);
    });

    it('should show a successful login message', () => {
        const output = {loggedIn: true, successMessage: "Good job you're in!"};
        expect(authentication({}, { type: "LOGIN_SUCCESS"
                                    , isLogin: true
                                    , message: "Good job you're in!"
                                  })
              ).toEqual(output);
    });

    it('should return a logged out state', () => {
        const output = { loggedIn: false };
        expect(authentication({ loggedIn: true }, { type: "LOGOUT" })
              ).toEqual(output);
    });
});
