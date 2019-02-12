import React from 'react'
import { Card } from 'antd'
import './index.less'

class SectionHeader extends React.Component {
  render() {
    return <Card className="section-content">{this.props.children}</Card>
  }
}

export default SectionHeader
