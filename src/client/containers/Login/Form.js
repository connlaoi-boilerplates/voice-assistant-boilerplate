import React from 'react'
import { Form, Input, Button, Icon } from 'antd'

const FormItem = Form.Item

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
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
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, type: 'email', message: 'Please input a valid email.' }]
          })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input a valid password.' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"
              type="password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            loading={this.props.isLoading}
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            size="large"
          >
            Login
          </Button>
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
      email: Form.createFormField(formFieldValues.email),
      password: Form.createFormField(formFieldValues.password)
    }
  }
  // onValuesChange(_, values) {
  //   console.log(values)
  // },
})(LoginForm)

export default CustomizedForm
