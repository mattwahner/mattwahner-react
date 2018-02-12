import { USER_LOGGED_IN } from "../types";
import api from "../api";

export const loggedIn = token => ({
    type: USER_LOGGED_IN,
    token
});

export const login = password => dispatch => {
    return api.user.login(password).then(token => dispatch(loggedIn(token)));
};
