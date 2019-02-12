import React from 'react'
import { Spin } from 'antd'
import './index.less'

class AppSpin extends React.Component {
  render() {
    return (
      <div className="app-spin">
        <Spin />
      </div>
    )
  }
}

export default AppSpin
