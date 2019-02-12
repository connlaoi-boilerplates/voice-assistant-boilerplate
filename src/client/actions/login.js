import * as ActionTypes from '../constants/actionTypes'
import { login } from './app'

export const changeFormFields = (formFieldsChange) => ({
  type: ActionTypes.LOGIN_EDITFORM_CHANGE,
  field: formFieldsChange
})

export const sendLoginRequest = (values) => (dispatch) => {
  dispatch({ type: ActionTypes.LOGIN_LOGIN_LOAD })
  window.setTimeout(() => {
    dispatch({ type: ActionTypes.LOGIN_LOGIN_SUCCEED })
    dispatch(login({ accessToken: values.email }))
    // dispatch({ type: ActionTypes.LOGIN_LOGIN_FAIL, loginError: 'This is a login error.' })
  }, 1000)
}
