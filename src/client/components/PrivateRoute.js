import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const isLoggedIn = !!rest.isLoggedIn
        return isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />
      }}
    />
  )
}

const mapStateToProps = (state) => {
  const isLoggedIn = !!state.app.accessToken
  return { isLoggedIn }
}

export default connect(mapStateToProps)(PrivateRoute)
