export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    let retVal = {};

    if (user && user.token) {
        retVal = { 'Authorization': 'Bearer ' + user.token };
    }

    return retVal;
}
