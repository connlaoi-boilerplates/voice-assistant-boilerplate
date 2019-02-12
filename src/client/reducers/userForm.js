import {
  USERFORM_FETCHITEM_LOAD,
  USERFORM_FETCHITEM_SUCCEED,
  USERFORM_FETCHITEM_FAIL,
  USERFORM_EDITFORM_CHANGE,
  USERFORM_ENTER_RESET,
  USERFORM_CREATEITEM_LOAD,
  USERFORM_CREATEITEM_SUCCEED,
  USERFORM_CREATEITEM_FAIL,
  USERFORM_EDITITEM_LOAD,
  USERFORM_EDITITEM_SUCCEED,
  USERFORM_EDITITEM_FAIL,
  USERFORM_DELETEITEM_LOAD,
  USERFORM_DELETEITEM_SUCCEED,
  USERFORM_DELETEITEM_FAIL
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case USERFORM_FETCHITEM_LOAD:
      console.log(state)
      return { ...state, isFetchItemLoading: true, fetchItemError: null }
    case USERFORM_FETCHITEM_SUCCEED:
      console.log(state)
      return { ...state, isFetchItemLoading: false, item: action.item }
    case USERFORM_FETCHITEM_FAIL:
      return { ...state, isFetchItemLoading: false, fetchItemError: action.fetchItemError }
    case USERFORM_ENTER_RESET:
      return {}
    case USERFORM_EDITFORM_CHANGE:
      return { ...state, formFieldValues: { ...state.formFieldValues, ...action.field } }
    case USERFORM_CREATEITEM_LOAD:
      return {
        ...state,
        isCreateItemLoading: true,
        isCreateItemSuccess: false,
        createItemError: null
      }
    case USERFORM_CREATEITEM_SUCCEED:
      return { ...state, isCreateItemLoading: false, isCreateItemSuccess: true }
    case USERFORM_CREATEITEM_FAIL:
      return { ...state, isCreateItemLoading: false, createItemError: action.createItemError }
    case USERFORM_EDITITEM_LOAD:
      return {
        ...state,
        isEditItemLoading: true,
        isEditItemSuccess: false,
        editItemError: null
      }
    case USERFORM_EDITITEM_SUCCEED:
      return { ...state, isEditItemLoading: false, isEditItemSuccess: true }
    case USERFORM_EDITITEM_FAIL:
      return { ...state, isEditItemLoading: false, editItemError: action.editItemError }
    case USERFORM_DELETEITEM_LOAD:
      return {
        ...state,
        isDeleteItemLoading: true,
        isDeleteItemSuccess: false,
        deleteItemError: null
      }
    case USERFORM_DELETEITEM_SUCCEED:
      return { ...state, isDeleteItemLoading: false, isDeleteItemSuccess: true }
    case USERFORM_DELETEITEM_FAIL:
      return { ...state, isDeleteItemLoading: false, deleteItemError: action.deleteItemError }
    default:
      return state
  }
}
