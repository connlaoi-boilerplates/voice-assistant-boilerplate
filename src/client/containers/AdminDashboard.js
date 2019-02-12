import React from 'react'
import { connect } from 'react-redux'
import AdminLayout from '../components/AdminLayout'
import SectionContent from '../components/SectionContent'

class AdminDashboard extends React.Component {
  render() {
    return (
      <AdminLayout>
        <SectionContent>
          <h3>Dashboard</h3>
          <p>Coming Soon</p>
        </SectionContent>
      </AdminLayout>
    )
  }
}

export default connect()(AdminDashboard)
