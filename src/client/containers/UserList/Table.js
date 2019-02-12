import React from 'react'
import { Table, Modal } from 'antd'
import { TableRowEditButton } from '../../components/AppButton'

class ItemListTable extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleDeleteButtonOnClick = this.handleDeleteButtonOnClick.bind(this)
  }

  handleDeleteButtonOnClick() {
    const handleTableOnDelete = () => {
      this.props.onDelete()
    }
    Modal.confirm({
      title: 'Delete Item',
      content: 'Are you sure to delete this item?',
      onOk() {
        handleTableOnDelete()
      },
      onCancel() {
        // console.log('Cancel')
      }
    })
  }

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: true
      },
      {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
        sorter: true
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
        sorter: true
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: true
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <TableRowEditButton to={`${this.props.editPath}/${record.id}`} />
          </span>
        )
      }
    ]
    return <Table rowKey={(record) => `item-row-${record.id}`} columns={columns} {...this.props} />
  }
}

export default ItemListTable
