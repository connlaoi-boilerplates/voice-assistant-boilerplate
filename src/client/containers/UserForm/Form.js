import React from 'react'
import { Form, Input, Button, Modal } from 'antd'

const FormItem = Form.Item

class ItemForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleOnDelete = this.handleOnDelete.bind(this)
  }

  handleOnSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      this.props.onSubmit(values)
    })
  }

  handleOnDelete(e) {
    e.preventDefault()
    const handleOnOk = () => {
      this.props.onDelete()
    }
    Modal.confirm({
      title: 'Delete Item',
      content: 'Are you sure to delete this item?',
      okType: 'danger',
      onOk() {
        handleOnOk()
      },
      onCancel() {
        // console.log('Cancel')
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 12,
          offset: 7
        }
      }
    }
    const isCreateForm = this.props.type === 'create'
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <FormItem label="First Name" {...formItemLayout}>
          {getFieldDecorator('first_name', {
            rules: [{ required: true, message: 'Please input a valid value.' }]
          })(<Input placeholder="First Name" />)}
        </FormItem>
        <FormItem label="Last Name" {...formItemLayout}>
          {getFieldDecorator('last_name', {
            rules: [{ required: true, message: 'Please input a valid value.' }]
          })(<Input placeholder="Last Name" />)}
        </FormItem>
        <FormItem label="Email" {...formItemLayout}>
          {getFieldDecorator('email', {
            rules: [{ required: true, type: 'email', message: 'Please input a valid value.' }]
          })(<Input placeholder="Email" />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button
            loading={this.props.isCreateItemLoading || this.props.isEditItemLoading}
            type="primary"
            htmlType="submit"
            style={{ marginRight: '12px' }}
          >
            {isCreateForm ? 'Create' : 'Save'}
          </Button>
          {!isCreateForm && (
            <Button
              loading={this.props.isDeleteItemLoading}
              type="danger"
              htmlType="button"
              onClick={this.handleOnDelete}
            >
              Delete
            </Button>
          )}
        </FormItem>
      </Form>
    )
  }
}

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onFieldsChange(changedFields)
  },
  mapPropsToFields(props) {
    const { formFieldValues = {} } = props
    return {
      first_name: Form.createFormField(formFieldValues.first_name),
      last_name: Form.createFormField(formFieldValues.last_name),
      email: Form.createFormField(formFieldValues.email)
    }
  }
  // onValuesChange(_, values) {
  //   console.log(values)
  // },
})(ItemForm)

export default CustomizedForm
