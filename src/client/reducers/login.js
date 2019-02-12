import {
  LOGIN_EDITFORM_CHANGE,
  LOGIN_LOGIN_LOAD,
  LOGIN_LOGIN_SUCCEED,
  LOGIN_LOGIN_FAIL
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_EDITFORM_CHANGE:
      return {
        ...state,
        formFieldValues: { ...state.formFieldValues, ...action.field },
        isLoginLoading: false
      }
    case LOGIN_LOGIN_LOAD:
      return {
        ...state,
        isLoginLoading: true,
        loginError: null
      }
    case LOGIN_LOGIN_SUCCEED:
      return {
        ...state,
        formFieldValues: {},
        isLoginLoading: false,
        isLoginSuccess: true
      }
    case LOGIN_LOGIN_FAIL:
      return {
        ...state,
        isLoginLoading: false,
        loginError: action.loginError
      }
    default:
      return state
  }
}
