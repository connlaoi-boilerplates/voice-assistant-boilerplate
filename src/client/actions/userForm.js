import * as ActionTypes from '../constants/actionTypes'

export const editForm = (formFieldsChange) => ({
  type: ActionTypes.USERFORM_EDITFORM_CHANGE,
  field: formFieldsChange
})

export const reset = () => ({
  type: ActionTypes.USERFORM_ENTER_RESET
})

export const fetchItem = (item) => (dispatch) => {
  dispatch({ type: ActionTypes.USERFORM_FETCHITEM_LOAD })
  window.setTimeout(() => {
    const item = {
      // id: item.itemId,
      // first_name: item.itemId,
      // last_name: item.itemId,
      // email: item.itemId
      id: 1,
      first_name: 'Joe',
      last_name: 'Smith',
      email: 'j.smith@host.com'
    }
    dispatch({
      type: ActionTypes.USERFORM_FETCHITEM_SUCCEED,
      item
    })
    dispatch({
      type: ActionTypes.USERFORM_EDITFORM_CHANGE,
      field: {
        id: { name: 'id', value: item.id },
        first_name: { name: 'first_name', value: item.first_name },
        last_name: { name: 'last_name', value: item.last_name },
        email: { name: 'email', value: item.email }
      }
    })
    // error
    // dispatch({
    //   type: ActionTypes.USERFORM_FETCHITEM_FAIL,
    //   fetchItemError: 'This is a fetch item error.',
    // })
  }, 1000)
}

export const createItem = (values) => (dispatch) => {
  dispatch({ type: ActionTypes.USERFORM_CREATEITEM_LOAD })
  window.setTimeout(() => {
    dispatch({ type: ActionTypes.USERLIST_CHANGETABLE_CHANGE })
    dispatch({ type: ActionTypes.USERFORM_CREATEITEM_SUCCEED })
    dispatch({ type: ActionTypes.USERFORM_ENTER_RESET })
    // dispatch({
    //   type: ActionTypes.USERFORM_CREATEITEM_FAIL,
    //   createItemError: 'This is a create item error.',
    // })
  }, 2000)
}

export const editItem = (params) => (dispatch) => {
  dispatch({ type: ActionTypes.USERFORM_EDITITEM_LOAD })
  window.setTimeout(() => {
    dispatch({ type: ActionTypes.USERFORM_EDITITEM_SUCCEED })
    // dispatch({
    //   type: ActionTypes.USERFORM_EDITITEM_FAIL,
    //   editItemError: 'This is a edit item error.',
    // })
  }, 2000)
}

export const deleteItem = (values) => (dispatch) => {
  dispatch({ type: ActionTypes.USERFORM_DELETEITEM_LOAD })
  window.setTimeout(() => {
    dispatch({ type: ActionTypes.USERFORM_DELETEITEM_SUCCEED })
    dispatch({ type: ActionTypes.USERFORM_ENTER_RESET })
    // dispatch({
    //   type: ActionTypes.USERFORM_DELETEITEM_FAIL,
    //   deleteItemError: 'This is a delete item error.',
    // })
  }, 2000)
}
