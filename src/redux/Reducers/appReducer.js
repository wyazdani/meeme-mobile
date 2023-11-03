import {act} from 'react-test-renderer';
import {
    BOTTOM_TAB_ICONS,
    CARD_INFO,
    FONT_CHANGE,
    LOGOUT_REQUEST,
    PROFILE_BACKGROUND,
    REQUESTS_COUNTS,
    SET_COINS,
    THEME_CHANGE,
    SET_SMS,
    SET_PRAVICY,
    SET_JUDGEMENT,
    SET_TOURNAMENT,
    SET_FOLLOWING
} from '../Actions/actionTypes';

const INITIAL_STATE = {
    app_Theme: 'black',
    bottom_tab_icon: 'black',
    bottom_tab_color: 'black',
    fontChange: 'f1',
    profileBackground: require('../../../assets/pngs/bgProfile4.png'),
    cardInfo: [],
    counts: 0,
    coins: 0,
    tempCoins: 0,
    judgedMemes: 0,
    theme_data: null,
    smsAlert: false,
    is_private: false,
    is_judge: false,
    is_tournament: false,
    is_following: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case THEME_CHANGE:
            return {
                ...state, app_Theme: action.payload.themeName, theme_data: action.payload.data,
            };

        case BOTTOM_TAB_ICONS:
            return {
                ...state, bottom_tab_color: action.payload,
            };
        case FONT_CHANGE:
            return {
                ...state, fontChange: action.payload,
            };
        case PROFILE_BACKGROUND:
            return {
                ...state, profileBackground: action.payload,
            };
        case CARD_INFO:
            return {
                ...state, cardInfo: action.payload,
            };
        // notifications requests
        case REQUESTS_COUNTS:
            return {
                ...state, counts: action.payload,
            };
        case SET_COINS:
            return {
                ...state,
                tempCoins: action.payload.coins,
                coins: action.payload.coins,
                judgedMemes: action.payload.counts,
            };

        case LOGOUT_REQUEST:
            return {
                ...state, cardInfo: [], counts: 0, coins: 0, judgedMemes: 0,
            };

        case SET_SMS:
            return {
                ...state, smsAlert: action.payload,
            };

        case SET_PRAVICY:
            return {
                ...state, is_private: action.payload,
            };

        case SET_JUDGEMENT:
            return {
                ...state, is_judge: action.payload,
            };

        case SET_TOURNAMENT:
            return {
                ...state, is_tournament: action.payload,
            };

        case SET_FOLLOWING:
            return {
                ...state, is_following: action.payload,
            };

        default:
            return state;
    }
};
