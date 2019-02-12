import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Empty, Row, Col, Input, message } from 'antd'
import AdminLayout from '../../components/AdminLayout'
import SectionHeader from '../../components/SectionHeader'
import SectionHeaderTemplate from '../../components/SectionHeaderTemplate'
import SectionContent from '../../components/SectionContent'
import { CreateButton } from '../../components/AppButton'
import Table from './Table'
import { fetchItems, changeTable, searchTable, editSearch } from '../../actions/userList'

const { Search } = Input
const pageTitle = 'Users'
const storeKey = 'userList'
const createPath = '/admin/employees/create'
const editPath = '/admin/employees/edit'

class ItemList extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleCreateButtonOnClick = this.handleCreateButtonOnClick.bind(this)
    this.handleTableOnChange = this.handleTableOnChange.bind(this)
    this.handleSearchOnChange = this.handleSearchOnChange.bind(this)
    this.handleSearchOnClick = this.handleSearchOnClick.bind(this)
    this.handleSearchOnCancel = this.handleSearchOnCancel.bind(this)
  }

  componentDidMount() {
    this.fetchItems()
    const { isSearching } = this.props
    !isSearching && this.props.editSearch({ search: null })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isFetchItemsLoading && nextProps.fetchItemsError) {
      message.error(nextProps.fetchItemsError)
    }
  }

  fetchItems() {
    const { pagination = {}, sorter = {}, search, isSearching } = this.props
    this.props.fetchItems({
      current: pagination.current,
      pageSize: pagination.pageSize,
      sort: sorter.columnKey,
      order: sorter.order,
      search: (isSearching && search) || null
    })
  }

  handleCreateButtonOnClick(e) {
    e.preventDefault()
    this.props.history.push(createPath)
  }

  async handleTableOnChange(pagination, filters, sorter) {
    const { columnKey, field, order } = sorter
    await this.props.changeTable({
      pagination,
      filters,
      sorter: {
        columnKey,
        field,
        order
      }
    })
    this.fetchItems()
  }

  handleSearchOnChange(e) {
    e.preventDefault()
    const search = e.target.value
    this.props.editSearch({ search })
    if (!search) {
      this.props.searchTable({ isSearching: false })
    }
  }

  async handleSearchOnClick() {
    await this.props.searchTable({ isSearching: true })
    await this.props.changeTable({})
    this.fetchItems()
  }

  async handleSearchOnCancel(e) {
    e.preventDefault()
    await this.props.editSearch({ search: null })
    await this.props.searchTable({ isSearching: false })
    await this.props.changeTable({})
    this.fetchItems()
  }

  render() {
    return (
      <AdminLayout>
        <SectionHeader>
          <SectionHeaderTemplate
            breadcrumbRoutes={[{ path: '/admin', title: 'Home' }, { title: pageTitle }]}
            title={pageTitle}
          />
        </SectionHeader>
        <SectionContent>
          <Row type="flex" justify="space-between" style={{ marginBottom: '24px' }}>
            <Col>
              <CreateButton onClick={this.handleCreateButtonOnClick} />
            </Col>
            <Col>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Search
                  onChange={this.handleSearchOnChange}
                  onSearch={this.handleSearchOnClick}
                  value={this.props.search}
                  enterButton
                />
                {this.props.isSearching && (
                  <a href="" onClick={this.handleSearchOnCancel} style={{ lineHeight: 1.5, marginLeft: '12px' }}>
                    Cancel
                  </a>
                )}
              </div>
            </Col>
          </Row>
          <Table
            loading={this.props.isFetchItemsLoading}
            dataSource={this.props.items || []}
            pagination={this.props.pagination}
            filters={this.props.filters}
            sorter={this.props.sorter}
            onChange={this.handleTableOnChange}
            editPath={editPath}
          />
        </SectionContent>
      </AdminLayout>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    items,
    total,
    isFetchItemsLoading,
    pagination = {},
    filters,
    sorter,
    search,
    isSearching,
    fetchItemsError
  } = state[storeKey]
  !pagination.pageSize && (pagination.pageSize = 7)
  !pagination.current && (pagination.current = 1)
  return {
    items,
    total,
    isFetchItemsLoading,
    pagination,
    filters,
    sorter,
    search,
    isSearching,
    fetchItemsError
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchItems: (params) => dispatch(fetchItems(params)),
  changeTable: (params) => dispatch(changeTable(params)),
  editSearch: (search) => dispatch(editSearch(search)),
  searchTable: (search) => dispatch(searchTable(search))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemList))
