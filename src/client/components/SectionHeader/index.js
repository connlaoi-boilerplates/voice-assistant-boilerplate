import React from 'react'
import './index.less'

class SectionHeader extends React.Component {
  render() {
    return <div className="section-header">{this.props.children}</div>
  }
}

export default SectionHeader
