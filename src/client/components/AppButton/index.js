import React from 'react'
import { Button, Icon, Modal } from 'antd'
import { Link } from 'react-router-dom'

export const CreateButton = props => (
  <Button type='primary' {...props}><Icon type='plus' />Create</Button>
)

export const TableRowEditButton = props => (
  <Link to={props.to}><Icon type='edit' style={{ marginRight: '6px' }} />Edit</Link>
)

export class TableRowDeleteButton extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    const handleOnOk = () => { this.props.deleteAction() }
    Modal.confirm({
      title: 'Delete Item',
      content: 'Are you sure to delete this item?',
      onOk() {
        handleOnOk()
      },
      onCancel() {
        // console.log('Cancel')
      },
    })
  }
  render() {
    return <a href='#' onClick={this.handleOnClick}><Icon type='delete' style={{ marginRight: '6px' }} />Delete</a>
  }
}
