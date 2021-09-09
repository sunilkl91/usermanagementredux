import { combineReducers } from 'redux';
import userCountReducer from './userCountReducer';
import userSessionReducer from './userSessionReducer';

const rootReducer = combineReducers({
    userCount: userCountReducer,
    userSession: userSessionReducer
});

export default rootReducer;