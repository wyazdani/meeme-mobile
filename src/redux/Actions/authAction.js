import {LOGIN_REQUEST, LOGOUT_REQUEST, SKIP_SPLASH, UPDATE_PROFILE} from './actionTypes';

export function Login(obj, token) {
    return {
        type: LOGIN_REQUEST,
        payload: {obj, token}
    };
}

export function Logout() {
    return {
        type: LOGOUT_REQUEST
    };
}

export function SkipSplash() {
    return {
        type: SKIP_SPLASH
    }
}

export function ProfileUpdate(obj) {
    return {
        type: UPDATE_PROFILE,
        payload: obj
    }
}

