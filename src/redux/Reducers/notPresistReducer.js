import {HOME_BTN_INDEX} from '../Actions/actionTypes';

const INITIAL_STATE = {
    btnSelect: 1,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HOME_BTN_INDEX:
            return {
                ...state, btnSelect: action.payload,
            };

        default:
            return state;
    }
};
