//Action Types
export const GET_USER_LIST = "GET_USER_LIST";
export const GET_LOGIN_USERDATA = "GET_LOGIN_USERDATA";
export const SET_USER_LIST = "SET_USER_LIST";


// //Action Creator
export const getUserList = () => async dispatch => {

    try {

        const response = JSON.parse(localStorage.getItem('userlist'));

        dispatch({
            type: GET_USER_LIST,
            payload: response
        })
    }
    catch (e) {
        dispatch({
            type: GET_USER_LIST,
            payload: {},
        })
    }

}

export const setUserList = (payload) => async dispatch => {
    
    dispatch({
        type: SET_USER_LIST,
        payload
    });
    
}