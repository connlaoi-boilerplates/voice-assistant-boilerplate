import React from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { message } from 'antd'
import AdminLayout from '../../components/AdminLayout'
import SectionHeader from '../../components/SectionHeader'
import SectionHeaderTemplate from '../../components/SectionHeaderTemplate'
import SectionContent from '../../components/SectionContent'
import Spin from '../../components/Spin'
import Form from './Form'
import { editForm, fetchItem, createItem, editItem, deleteItem, reset } from '../../actions/userForm'

const listPath = '/admin/employees'
const itemsTitle = 'Employees'
const itemTitle = 'employee'
const storeKey = 'userForm'

class ItemForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleFormOnSubmit = this.handleFormOnSubmit.bind(this)
    this.handleFormOnDelete = this.handleFormOnDelete.bind(this)
    this.props.reset()
  }

  componentDidMount() {
    if (this.props.type === 'edit') {
      console.log(this.props.match.params)
      this.props.fetchItem({ ...this.props.item })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isCreateItemLoading && nextProps.isCreateItemSuccess) {
      message.success('You have successfully created the item.')
    } else if (this.props.isEditItemLoading && nextProps.isEditItemSuccess) {
      message.success('You have successfully edited the item.')
    } else if (this.props.isDeleteItemLoading && nextProps.isDeleteItemSuccess) {
      message.success('You have successfully deleted the item.')
    } else if (this.props.isCreateItemLoading && nextProps.createItemError) {
      message.error(nextProps.createItemError)
    } else if (this.props.isEditItemLoading && nextProps.editItemError) {
      message.error(nextProps.editItemError)
    } else if (this.props.isDeleteItemLoading && nextProps.deleteItemError) {
      message.error(nextProps.deleteItemError)
    } else if (this.props.isFetchItemLoading && nextProps.fetchItemError) {
      message.error(nextProps.fetchItemError)
    }
  }

  handleFormOnSubmit(values) {
    if (this.props.type === 'create') {
      this.props.createItem(values)
    } else {
      const item = { ...this.props.item, ...values }
      this.props.editItem(item)
    }
  }

  handleFormOnDelete() {
    this.props.deleteItem({ id: this.props.match.params.itemId })
  }

  render() {
    const { type, isCreateItemSuccess, isDeleteItemSuccess } = this.props
    const isCreateForm = type === 'create'
    const actionTitle = isCreateForm ? 'Create' : 'Edit'
    if (isCreateItemSuccess || isDeleteItemSuccess) {
      return <Redirect to={listPath} />
    }
    return (
      <div>
        <AdminLayout>
          <SectionHeader>
            <SectionHeaderTemplate
              breadcrumbRoutes={[
                { path: '/admin', title: 'Home' },
                { path: listPath, title: itemsTitle },
                { title: actionTitle }
              ]}
              title={`${actionTitle} ${itemTitle}`}
            />
          </SectionHeader>
          <SectionContent>
            {this.props.isFetchItemLoading && <Spin />}
            {(isCreateForm || (!isCreateForm && this.props.item)) && (
              <Form
                onSubmit={this.handleFormOnSubmit}
                onDelete={this.handleFormOnDelete}
                onFieldsChange={this.props.editForm}
                formFieldValues={this.props.formFieldValues}
                isCreateItemLoading={this.props.isCreateItemLoading}
                isEditItemLoading={this.props.isEditItemLoading}
                isDeleteItemLoading={this.props.isDeleteItemLoading}
                type={this.props.type}
              />
            )}
          </SectionContent>
        </AdminLayout>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    formFieldValues,
    isFetchItemLoading,
    isEditItemLoading,
    isCreateItemLoading,
    isCreateItemSuccess,
    isEditItemSuccess,
    isDeleteItemLoading,
    isDeleteItemSuccess,
    item,
    fetchItemError,
    createItemError,
    editItemError,
    deleteItemError
  } = state[storeKey]
  return {
    isFetchItemLoading,
    formFieldValues,
    isEditItemLoading,
    isCreateItemLoading,
    isCreateItemSuccess,
    isEditItemSuccess,
    isDeleteItemLoading,
    isDeleteItemSuccess,
    item,
    fetchItemError,
    createItemError,
    editItemError,
    deleteItemError
  }
}

const mapDispatchToProps = (dispatch) => ({
  createItem: (params) => dispatch(createItem(params)),
  editItem: (params) => dispatch(editItem(params)),
  fetchItem: (params) => dispatch(fetchItem(params)),
  deleteItem: (params) => dispatch(deleteItem(params)),
  editForm: (formFieldsChange) => dispatch(editForm(formFieldsChange)),
  reset: () => dispatch(reset())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemForm))
