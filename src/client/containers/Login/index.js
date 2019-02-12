import { Card, message } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import React from 'react'

import { changeFormFields, sendLoginRequest } from '../../actions/login'
import Form from './Form'

import './index.less'
import appIcon from '../../assets/ai-hub-logo.png'
import backgroundImage from '../../assets/background.jpg'

class Login extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.isLoginLoading && nextProps.isLoginSuccess) {
      message.success('You have successfully logged in.')
    } else if (this.props.isLoginLoading && nextProps.loginError) {
      message.error(nextProps.loginError)
    }
  }

  render() {
    const { isLoggedIn } = this.props
    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/admin/dashboard' }} />
    }
    return (
      <div
        className="login-page"
        style={{
          backgroundImage: `url(` + backgroundImage + `)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <Card className="login-form">
          <div className="header">
            <img src={appIcon} height="120px" alt="Voice Assistant Boilerplate" />
            <h1>Login</h1>
            <p>Authorized Access Only</p>
          </div>
          <Form
            onSubmit={this.props.handleFormOnSubmit}
            onFieldsChange={this.props.handleFormOnFieldsChange}
            formFieldValues={this.props.formFieldValues}
            isLoading={this.props.isLoginLoading}
          />
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { formFieldValues, isLoginLoading, isLoginSuccess, loginError } = state.login
  const isLoggedIn = !!state.app.accessToken
  return {
    formFieldValues,
    isLoginLoading,
    isLoggedIn,
    isLoginSuccess,
    loginError
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleFormOnSubmit: (formValues) => dispatch(sendLoginRequest(formValues)),
  handleFormOnFieldsChange: (formFieldsChange) => dispatch(changeFormFields(formFieldsChange))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
