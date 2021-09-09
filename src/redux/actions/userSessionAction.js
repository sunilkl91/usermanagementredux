//Action Types
export const SET_SESSION_DATA = "SET_SESSION_DATA";
export const GET_SESSION_DATA = "GET_SESSION_DATA";


//Action Creator
export const setSessionData = (payload) => async dispatch => {
    dispatch({
        type: SET_SESSION_DATA,
        payload
    });
}

//Action Creator
export const getSessionData = () => async dispatch => {
    dispatch({
        type: GET_SESSION_DATA,
    })
}
