import {
    LOGIN_REQUEST, LOGOUT_REQUEST, SKIP_SPLASH, UPDATE_PROFILE,
} from '../Actions/actionTypes';

const INITIAL_STATE = {
    isLogin: false, token: null, user: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state, isLogin: true, user: action.payload.obj, token: action.payload.token,
            };

        case LOGOUT_REQUEST:
            return {
                ...state, isLogin: false, token: null, user: null,
            };
        case SKIP_SPLASH:
            return {
                ...state, isLogin: false,
            };
        case UPDATE_PROFILE:
            return {
                ...state, user: action.payload,
            };
        default:
            return state;
    }
};
