import { connect } from 'react-redux'
import { Layout, Menu, Modal, Icon, Switch } from 'antd'
import { withRouter } from 'react-router-dom'
import React from 'react'

import { logout } from '../../actions/app'

const { Header } = Layout

class CustomisedHeader extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleMenuItemOnClick = this.handleMenuItemOnClick.bind(this)
  }

  handleMenuItemOnClick(item) {
    switch (item.key) {
      case 'home': {
        this.props.history.push('/')
        break
      }
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
          onCancel() {}
        })
        break
      }
      default:
    }
  }

  render() {
    return (
      <Header className="admin-header" style={{ padding: 0 }}>
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.handleHeaderOnToggle}
        />
        <Menu mode="horizontal" selectable={false} style={{ lineHeight: '64px' }} onClick={this.handleMenuItemOnClick}>
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="logout">Logout</Menu.Item>
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
