import * as ActionTypes from '../constants/actionTypes'
import axios from 'axios'

export const login = (values) => (dispatch) => {
  localStorage.setItem('accessToken', values.accessToken)
  dispatch({ type: ActionTypes.APP_LOGIN_SET, accessToken: values.accessToken })
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('accessToken')
  dispatch({ type: ActionTypes.APP_LOGOUT_SET })
}
