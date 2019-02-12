import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import React from 'react'

import AdminDashboard from '../AdminDashboard'
import ArtyomRosie from '../Artyom'
import Home from '../Home'
import Login from '../Login'
import NotFound from '../NotFound'
import PrivateRoute from '../../components/PrivateRoute'
import UserForm from '../UserForm'
import UserList from '../UserList'

import './index.less'

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <ArtyomRosie {...this.props}>
          <Switch>
            <Route exact path="/" component={(props) => <Home {...props} />} />
            <Route exact path="/home" component={(props) => <Redirect to="/" />} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/admin" component={() => <Redirect to="/admin/dashboard" />} />
            <PrivateRoute exact path="/admin/dashboard" component={(props) => <AdminDashboard />} />
            <PrivateRoute exact path="/admin/users" component={(props) => <UserList {...props} />} />
            <PrivateRoute
              exact
              path="/admin/employees/create"
              component={(props) => <UserForm {...props} type="create" />}
            />
            <PrivateRoute
              exact
              path="/admin/employees/edit/:itemId"
              component={(props) => <UserForm {...props} type="edit" />}
            />
            <Route path="/" component={NotFound} />
          </Switch>
        </ArtyomRosie>
      </BrowserRouter>
    )
  }
}
