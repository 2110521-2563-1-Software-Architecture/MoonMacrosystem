import React from 'react'
import { Form, Input, Button, Checkbox, Layout } from 'antd'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}
const divStyle = {
  width: '100%',
  minHeight: '100%',
  background: 'white',
  paddingTop: '3em',
}
const formStyle = {
  marginRight: '20%',
}
const Test = () => {
  return <h1>Hello</h1>
}

const Login = () => {
  const onFinish = (values: unknown) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div style={divStyle}>
      <Test />
      <Form
        {...layout}
        name="login-form"
        style={formStyle}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Login
