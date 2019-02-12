import { HOME_FETCHITEMS_LOAD, HOME_FETCHITEMS_SUCCEED, HOME_FETCHITEMS_FAIL } from '../constants/actionTypes'
const initState = {
  isItemsLoading: true,
  isItemsSuccess: false,
  itemsError: null,
  items: []
}
export default (state = initState, action) => {
  switch (action.type) {
    case HOME_FETCHITEMS_LOAD:
      return {
        ...state,
        isItemsLoading: true
      }
    case HOME_FETCHITEMS_SUCCEED:
      return {
        ...state,
        isItemsLoading: false,
        isItemsSuccess: true,
        items: action.items
      }
    case HOME_FETCHITEMS_FAIL:
      return {
        ...state,
        isItemsLoading: false,
        itemsError: action.itemsError
      }
    default:
      return state
  }
}
