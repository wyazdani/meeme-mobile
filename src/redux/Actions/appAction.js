import {
    BOTTOM_TAB_COLORS,
    BOTTOM_TAB_ICONS,
    CARD_INFO,
    FONT_CHANGE,
    HOME_BTN_INDEX,
    PROFILE_BACKGROUND,
    REQUESTS_COUNTS,
    SET_COINS,
    THEME_CHANGE,
    SET_SMS,
    SET_PRAVICY,
    SET_JUDGEMENT,
    SET_TOURNAMENT,
    SET_FOLLOWING,
} from './actionTypes';

export function ChangeTheme(themeName, data) {
    return {
        type: THEME_CHANGE,
        payload: {themeName, data},
    };
}

export function ChangeBottomTabIcon(iconName) {
    return {
        type: BOTTOM_TAB_ICONS,
        payload: iconName,
    };
}

export function ChangeBottomTabColor(colorName) {
    return {
        type: BOTTOM_TAB_COLORS,
        payload: colorName,
    };
}

export function ChangeFonts(font) {
    return {
        type: FONT_CHANGE,
        payload: font,
    };
}

export function ProfileBackGround(path) {
    return {
        type: PROFILE_BACKGROUND,
        payload: path,
    };
}

export function CardInfo(data) {
    return {
        type: CARD_INFO,
        payload: data,
    };
}

// requests counts
export function notificationRequests(counts) {
    return {
        type: REQUESTS_COUNTS,
        payload: counts,
    };
}

export function SetJudgeCount_Coins(coins, counts) {
    return {
        type: SET_COINS,
        payload: {coins, counts},
    };
}

export function setBtnSelect(params) {
    return {
        type: HOME_BTN_INDEX,
        payload: params,
    };
}

export function setSms_Alert(params) {
    return {
        type: SET_SMS,
        payload: params,
    };
}

export function setPrivate_Alert(params) {
    return {
        type: SET_PRAVICY,
        payload: params,
    };
}

export function setJudge_Request(params) {
    return {
        type: SET_JUDGEMENT,
        payload: params,
    };
}

export function setTournament_Request(params) {
    return {
        type: SET_TOURNAMENT,
        payload: params,
    };
}
export function setFollowing_Request(params) {
    return {
        type: SET_FOLLOWING,
        payload: params,
    };
}
