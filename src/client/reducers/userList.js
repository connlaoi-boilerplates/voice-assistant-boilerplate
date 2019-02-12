import {
  USERLIST_FETCHITEMS_LOAD,
  USERLIST_FETCHITEMS_SUCCEED,
  USERLIST_FETCHITEMS_FAIL,
  USERLIST_CHANGETABLE_CHANGE,
  USERLIST_SEARCHTABLE_EDIT,
  USERLIST_SEARCHTABLE_SEARCH
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case USERLIST_FETCHITEMS_LOAD:
      return { ...state, isFetchItemsLoading: true, fetchItemsError: null }
    case USERLIST_FETCHITEMS_SUCCEED:
      return {
        ...state,
        isFetchItemsLoading: false,
        items: action.items,
        pagination: { ...state.pagination, total: action.total }
      }
    case USERLIST_FETCHITEMS_FAIL:
      return {
        ...state,
        isFetchItemsLoading: false,
        items: null,
        fetchItemsError: action.fetchItemsError
      }
    case USERLIST_CHANGETABLE_CHANGE: {
      return {
        ...state,
        pagination: action.pagination,
        filters: action.filters,
        sorter: action.sorter
      }
    }
    case USERLIST_SEARCHTABLE_EDIT:
      return {
        ...state,
        search: action.search
      }
    case USERLIST_SEARCHTABLE_SEARCH:
      return {
        ...state,
        isSearching: action.isSearching
      }
    default:
      return state
  }
}
