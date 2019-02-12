import React from 'react'
import { Layout, Icon, Tooltip } from 'antd'
import './index.less'

const { Footer } = Layout
var d = new Date()

class CustomisedFooter extends React.Component {
  render() {
    return (
      <Footer className="app-footer">
        Created with&nbsp;
        <Icon type="heart" className="heartNip" />
        &nbsp;at the AI/HUB
        <br />
        <p>
          <Tooltip placement="topLeft" arrowPointAtCenter title="Just ask, please! :)">
            <Icon type="copyright" />
          </Tooltip>
          &nbsp;{d.getFullYear()}&nbsp;|&nbsp;AI/HUB&nbsp;|&nbsp;All Rights Reserved
        </p>
      </Footer>
    )
  }
}

export default CustomisedFooter
