import React, { CSSProperties } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Layout, Typography } from 'antd'
import logo from '../assets/img/logo.svg'
import { registerPayload } from '../services/intf'
import { Redirect } from 'react-router-dom'

//#region
const { Header, Content, Footer } = Layout
const { Title } = Typography

const headerStyle: CSSProperties = {
  boxSizing: 'border-box',
  background: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '0.1em',
}
const titleStyle: CSSProperties = {
  textAlign: 'center',
  margin: '2em 0',
  fontWeight: 'bold',
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
const formStyle: CSSProperties = {
  margin: '1em 10% 3em 5%',
}
//#endregion

const Register = () => {
  const history = useHistory()

  const redirectToRegister = () => {
    history.push('/register')
  }
  const redirectToLogin = () => {
    history.push('/')
  }

  const onFinish = (values: registerPayload) => {
    console.log('Success:', values)
    history.push('/')
  }
  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Layout hasSider={false} style={{ background: '#f0f2f5' }}>
      <Header style={headerStyle}>
        <img src={logo} alt="Tumrai" style={{ maxHeight: '100%', maxWidth: '100%' }} />
        <div style={{ display: 'inline-block' }}>
          <Button type="default" style={{ marginRight: '1em' }} onClick={redirectToRegister}>
            Register
          </Button>
          <Button type="primary" onClick={redirectToLogin}>
            Login
          </Button>
        </div>
      </Header>
      <Content style={{ padding: '0 20%', background: 'white' }}>
        <Title style={titleStyle}>Register</Title>
        <Form
          {...layout}
          name="login-form"
          style={formStyle}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Display name"
            name="displayname"
            rules={[{ required: true, message: 'Please input your display name!' }]}
          >
            <Input />
          </Form.Item>

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
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('The two passwords that you entered do not match!')
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div style={{ textAlign: 'center', margin: '5em 0 2em 0' }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </div>
          <div style={{ textAlign: 'center' }}>
            Already have an account? <a onClick={redirectToLogin}>Login</a>
          </div>
        </Form>
      </Content>
      <Footer style={{ background: 'white' }} />
    </Layout>
  )
}
export default Register
