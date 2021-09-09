import { SET_SESSION_DATA, GET_SESSION_DATA } from '../actions/userSessionAction';

const initialState = {
    userSession: null
}


const userSessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION_DATA:
            localStorage.setItem('loginUser', action.payload);
            return {
                ...state,
                userSession: action.payload,

            }
            case GET_SESSION_DATA:

            return {
                ...state,
                userSession : JSON.parse(localStorage.getItem('loginUser'))
            }
        default:
            return state;
    }
};

export default userSessionReducer;