import { Card, Layout, Col, Row, Timeline, Skeleton } from 'antd'
import React from 'react'

import AppFooter from '../../components/AppFooter'
import AppHeader from '../../components/AppHeader'

import './index.less'

const { Content } = Layout
const { Meta } = Card

export default class Home extends React.Component {
  render() {
    // const {loading, items, timelineData, } = this.props;
    let loading = false
    let items = [
      { color: 'green', texts: ['Create something! :)'], date: '2019-01-03' },
      {
        color: 'red',
        texts: ['Create something! :)', 'Create something! :)', 'Create something! :)'],
        date: '2019-01-08'
      },
      {
        color: 'orange',
        texts: ['Create something! :)', 'Create something! :)', 'Create something! :)'],
        date: '2019-01-08'
      },
      {
        color: 'green',
        texts: ['Create something! :)', 'Create something! :)', 'Create something! :)'],
        date: '2019-01-08'
      },
      {
        color: 'blue',
        texts: ['Create something! :)', 'Create something! :)', 'Create something! :)'],
        date: '2019-01-08'
      },
      {
        color: 'orange',
        texts: ['Create something! :)', 'Create something! :)', 'Create something! :)'],
        date: '2019-01-08'
      },
      {
        color: 'red',
        texts: ['Create something! :)', 'Create something! :)', 'Create something! :)'],
        date: '2019-01-08'
      },
      { color: 'green', texts: ['Create a services site'], date: '2019-01-03' },
      {
        color: 'red',
        texts: ['Create something! :)', 'Create something! :)', 'Create something! :)'],
        date: '2019-01-08'
      },
      {
        color: 'orange',
        texts: ['Create something! :)', 'Create something! :)', 'Create something! :)'],
        date: '2019-01-08'
      },
      {
        color: 'green',
        texts: ['Create something! :)', 'Create something! :)', 'Create something! :)'],
        date: '2019-01-08'
      },
      {
        color: 'blue',
        texts: ['Create something! :)', 'Create something! :)', 'Create something! :)'],
        date: '2019-01-08'
      },
      {
        color: 'orange',
        texts: ['Create something! :)', 'Create something! :)', 'Create something! :)'],
        date: '2019-01-08'
      },
      {
        color: 'red',
        texts: ['Create something! :)', 'Create something! :)', 'Create something! :)'],
        date: '2019-01-08'
      }
    ]

    // some fake data for demo
    let timelineData = items.map((item, key) => (
      <Timeline.Item key={key} color={item.color}>
        {item.texts.map((text, key) => <p key={key}>{key === 0 ? text + ' | ' + item.date : text}</p>)}
      </Timeline.Item>
    ))
    return (
      <Layout className="home-page">
        <AppHeader />
        <Content>
          <Row>
            <Col span={12}>
              <Card bordered={false} style={{ margin: '16' }}>
                <Skeleton loading={loading} avatar active>
                  <h3>Voice Assistant Boilerplate</h3>
                  <Timeline>{timelineData}</Timeline>
                </Skeleton>
              </Card>
            </Col>
          </Row>
        </Content>
        <AppFooter />
      </Layout>
    )
  }
}
