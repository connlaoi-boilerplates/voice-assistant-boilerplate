import { APP_LOGIN_SET, APP_LOGOUT_SET } from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case APP_LOGIN_SET:
      return {
        ...state,
        accessToken: action.accessToken
      }
    case APP_LOGOUT_SET:
      return {
        ...state,
        accessToken: null
      }
    default:
      return state
  }
}
