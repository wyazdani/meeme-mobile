import {combineReducers} from 'redux';
import authReducer from './authReducer';
import appReducer from './appReducer';
import notPresistReducer from './notPresistReducer';

const rootReducer = combineReducers({
    authReducer, appReducer, notPresistReducer,
});

export default rootReducer;
