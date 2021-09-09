import { GET_USER_LIST,SET_USER_LIST } from '../actions/countAction';

const initialState = {
    userList: {

    }
}


const userCountReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_LIST:
        localStorage.setItem('userlist', JSON.stringify(action.payload))
        return {
            ...state,
            userData: action.payload,

        }
        case GET_USER_LIST:
            return {
                ...state,
                userList: action.payload,

            }
        default:
            return state;
    }
};

export default userCountReducer;