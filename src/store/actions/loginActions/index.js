import axios from "axios";
import { createAction } from "redux-actions";
import { BASE_URL } from "../../../constants"


export const LOGIN_STATUS = {
  initiated: 0,
  failed: 1,
  error: 2,
  success: 3,
};

export const loginApiStatus = createAction('CHECK_LOGIN')
export const loginHandler = userDetails =>{
    return dispatch => {
        dispatch(loginApiStatus(LOGIN_STATUS.initiated))
        axios.post(`${BASE_URL}/login/`, userDetails)
        .then(response=>{
            localStorage.setItem('accessToken', response.data.access_token)
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('user_type', response.data.user_type)
            dispatch(loginApiStatus(LOGIN_STATUS.success))
        })
        .catch(e=>{
            dispatch(loginApiStatus(LOGIN_STATUS.error))
        })
    }
}