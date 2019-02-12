import { combineReducers } from 'redux'
import app from './app'
import artyom from './artyom'
import home from './home'
import login from './login'
import admin from './admin'
import userList from './userList'
import userForm from './userForm'

export default combineReducers({
  app,
  artyom,
  home,
  login,
  admin,
  userList,
  userForm
})
