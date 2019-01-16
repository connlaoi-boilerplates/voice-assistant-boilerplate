import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'

const itemRender = (route, params, routes, paths) => {
  const last = routes.indexOf(route) === routes.length - 1
  return last ? <span>{route.title}</span> : <Link to={route.path}>{route.title}</Link>
}

class SectionHeaderTemplate extends React.Component {
  render() {
    const { breadcrumbRoutes, title } = this.props
    return (
      <div className='section-header-template'>
        {breadcrumbRoutes && <Breadcrumb itemRender={itemRender} routes={breadcrumbRoutes} />}
        {title && <h1>{title}</h1>}
      </div>
    )
  }
}

export default SectionHeaderTemplate
