import { ADMIN_OPENSUBMENU_CHANGE } from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case ADMIN_OPENSUBMENU_CHANGE:
      return {
        ...state,
        openKeys: action.openKeys
      }
    default:
      return state
  }
}
