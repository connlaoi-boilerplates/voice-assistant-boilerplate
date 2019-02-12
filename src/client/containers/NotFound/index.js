import { Card, message } from 'antd'
import React from 'react'
import AppFooter from '../../components/AppFooter'

import './index.less'
import appIcon from '../../assets/ai-hub-logo.png'
import backgroundImage from '../../assets/background.jpg'

class NotFound extends React.Component {
  render() {
    return (
      <div
        className="not-found-page"
        style={{
          backgroundImage: `url(` + backgroundImage + `)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <Card className="container">
          <div className="header">
            <img src={appIcon} height="48px" alt="Voice Assistant Boilerplate" />
            <h1>404 - Not Found</h1>
            <p>Sorry, that page doesn&apos;t exist!</p>
          </div>
        </Card>
        <AppFooter />
      </div>
    )
  }
}

export default NotFound
