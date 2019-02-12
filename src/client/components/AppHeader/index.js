import { connect } from 'react-redux'
import { Layout, Menu, Modal, message } from 'antd'
import { withRouter } from 'react-router-dom'
import React from 'react'

import { logout } from '../../actions/app'

import './index.less'
import appIcon from '../../assets/aihub-logo-slim.png'

const { Header } = Layout

class CustomisedHeader extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.handleMenuItemOnClick = this.handleMenuItemOnClick.bind(this)

    this.state = {
      collapsed: false
    }
  }

  handleMenuItemOnClick(item) {
    switch (item.key) {
      case 'login':
        this.props.history.push('/login')
        break
      case 'admin':
        this.props.history.push('/admin/dashboard')
        break
      case 'logout': {
        const handleAppLogOut = () => {
          this.props.handleAppLogOut()
        }
        Modal.confirm({
          title: 'Logout',
          content: 'Are you sure you want to log out?',
          onOk() {
            handleAppLogOut()
          },
          onCancel() {
            // console.log('Cancel')
          }
        })
        break
      }
      default:
    }
  }

  render() {
    const { isLoggedIn } = this.props
    return (
      <Header className="app-header">
        <div className="logo">
          <a href="/">
            <img className="nav-logo" src={appIcon} alt="Voice Assistant" />
          </a>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          style={{ lineHeight: '64px' }}
          onClick={this.handleMenuItemOnClick}
        >
          {!isLoggedIn && <Menu.Item key="login">Login</Menu.Item>}
          {isLoggedIn && <Menu.Item key="admin">Admin</Menu.Item>}
          {isLoggedIn && <Menu.Item key="logout">Logout</Menu.Item>}
        </Menu>
      </Header>
    )
  }
}

const mapStateToProps = (state) => {
  const isLoggedIn = !!state.app.accessToken
  return { isLoggedIn }
}

const mapDispatchToProps = (dispatch) => ({
  handleAppLogOut: () => dispatch(logout())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomisedHeader))
