import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";
import { setAuthorizationHeader } from "../utils";

export const loggedIn = token => ({
    type: USER_LOGGED_IN,
    token
});

export const loggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const login = password => dispatch =>
    api.user.login(password).then(token => {
        localStorage.token = token;
        setAuthorizationHeader(token);
        dispatch(loggedIn(token));
    });

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    setAuthorizationHeader();
    dispatch(loggedOut());
};
