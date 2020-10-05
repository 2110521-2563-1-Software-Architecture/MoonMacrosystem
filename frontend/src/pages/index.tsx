import React from 'react'
import { Form, Input, Button, Checkbox, Layout } from 'antd'
<<<<<<< HEAD
import logo from '../assets/img/logo.svg'
import { loginPayload } from '../services/intf'
import signIn from '../services/api'
||||||| merged common ancestors
=======
import logo from '../assets/img/logo.svg'
>>>>>>> 4c20d34dd51422b0614c16717fc023a2f990d8c0

//#region
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
  marginTop: '3em',
  marginLeft: '20%',
  marginRight: '30%',
}
//#endregion

const Login = () => {
  const onFinish = (values: loginPayload) => {
    console.log('Success:', values)
    console.log(signIn(values))
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div style={divStyle}>
      <div style={{ textAlign: 'center' }}>
        <img src={logo} alt="Tumrai" />
      </div>
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
