import React, { CSSProperties, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Layout, Typography, message } from 'antd'
import logo from '../assets/img/logo.svg'
import { ILogin } from '../services/intf'
import { authentication } from '../services/api'
import { redirectTo } from '../services/redirect'

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
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
}
const formStyle: CSSProperties = {
  margin: '1em 10% 3em 5%',
}

const Login = () => {
  const redirectToRegister = () => {
    redirectTo('/register')
  }
  const redirectToLogin = () => {
    redirectTo('/')
  }
  const onFinish = (values: any) => {
    var payload: ILogin = {
      username: values.username,
      password: values.password,
    }
    authentication.login(
      payload,
      ({ data }: any) => {
        if (data.status == '200') {
          localStorage.setItem('REMEMBER', values.remember)
          localStorage.setItem('USERNAME', data.body.username)
          localStorage.setItem('ACCESS_TOKEN', 'true')
          message.success('Login success!')
          redirectTo('/home')
        } else {
          message.error('Username or Password is invalid')
        }
      },
      (response: any) => {
        console.log(response.data)
      }
    )
  }
  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo)
  }
  useEffect(() => {}, [])
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
        <Title style={titleStyle}>Login</Title>
        <Form
          {...layout}
          name="login-form"
          style={formStyle}
          initialValues={{
            remember: true,
            username: localStorage.getItem('REMEMBER') ? localStorage.getItem('USERNAME') : null,
          }}
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

          <div style={{ textAlign: 'center', margin: '5em 0 2em 0' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
          <div style={{ textAlign: 'center' }}>
            Don't have an account yet? <a onClick={redirectToRegister}>Register</a>
          </div>
        </Form>
      </Content>
      <Footer style={{ background: 'white' }} />
    </Layout>
  )
}
export default Login
