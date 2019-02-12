import * as ActionTypes from '../constants/actionTypes'
import axios from 'axios'

export const fetchItems = (params = {}) => (dispatch) => {
  dispatch({ type: ActionTypes.USERLIST_FETCHITEMS_LOAD })
  window.setTimeout(() => {
    const { current = 1, pageSize = 2, sort, order = 'descend', search } = params
    const $skip = (current - 1) * pageSize
    const $limit = pageSize
    const getItems = (skip, limit) => {
      if (skip === 0) {
        return [
          {
            id: 1,
            first_name: 'Joe',
            last_name: 'Smith',
            email: 'j.smith@host.com'
          }
        ]
      } else if (skip === 1) {
        return [
          {
            id: 2,
            first_name: 'Hello',
            last_name: 'World',
            email: 'hello@word.com'
          }
        ]
      }
      return []
    }
    const items = getItems($skip, $limit)
    const total = 2
    dispatch({
      type: ActionTypes.USERLIST_FETCHITEMS_SUCCEED,
      items,
      total
    })
    // error
    // dispatch({
    //   type: ActionTypes.USERLIST_FETCHITEMS_FAIL,
    //   fetchItemsError: 'This is a error',
    // })
  }, 2000)
}

export const changeTable = (params) => (dispatch) => {
  const { pagination = {}, filters = {}, sorter = {} } = params
  dispatch({
    type: ActionTypes.USERLIST_CHANGETABLE_CHANGE,
    pagination,
    filters,
    sorter
  })
}

export const searchTable = ({ isSearching }) => (dispatch) => {
  dispatch({
    type: ActionTypes.USERLIST_SEARCHTABLE_SEARCH,
    isSearching
  })
}

export const editSearch = (params) => (dispatch) => {
  const { search } = params
  dispatch({
    type: ActionTypes.USERLIST_SEARCHTABLE_EDIT,
    search
  })
}
