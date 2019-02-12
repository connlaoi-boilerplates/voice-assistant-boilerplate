import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import React from 'react'

import { openChangeMenu } from '../../actions/admin'
import AppFooter from '../../components/AppFooter'
import Header from './Header'

import './index.less'
import appIcon from '../../assets/aihub-logo-slim.png'

require('babel-core/register')
require('babel-polyfill')

const { Sider, Content } = Layout
const { SubMenu } = Menu

class Admin extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.handleHeaderOnToggle = this.handleHeaderOnToggle.bind(this)
    this.handleMenuItemOnClick = this.handleMenuItemOnClick.bind(this)

    this.state = {
      collapsed: false
    }
  }

  handleHeaderOnToggle() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  handleMenuItemOnClick(item) {
    this.props.history.push(`/admin/${item.key}`)
  }

  render() {
    const { match, children, openKeys } = this.props
    const selectedKey = match.path.split('/').splice(-1)[0]

    return (
      <Layout className="admin-page">
        <Sider className="admin-sider" collapsible collapsed={this.state.collapsed} trigger={null} width={256}>
          <div className="logo">
            <img src={appIcon} alt="Admin Portal" />
            {!this.state.collapsed && <h1>Admin</h1>}
          </div>
          <Menu
            className="menu"
            theme="dark"
            mode="inline"
            openKeys={this.state.collapsed ? [] : openKeys}
            selectedKeys={[selectedKey]}
            onClick={this.handleMenuItemOnClick}
            onOpenChange={this.props.handleMenuOnOpenChange}
          >
            <Menu.Item key="dashboard">
              <Icon type="dashboard" />
              <span>Dashboard</span>
            </Menu.Item>
            <Menu.Item key="users">
              <Icon type="team" />
              <span>Users</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header collapsed={this.state.collapsed} handleHeaderOnToggle={this.handleHeaderOnToggle} />
          <Content>{children}</Content>
          <AppFooter />
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const { openKeys } = state.admin || ['general']
  return { openKeys }
}

const mapDispatchToProps = (dispatch) => ({
  handleMenuOnOpenChange: (openKeys) => dispatch(openChangeMenu(openKeys))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin))
