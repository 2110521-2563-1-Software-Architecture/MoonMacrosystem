import React, { CSSProperties } from 'react'
import { Layout, List, Avatar, Comment, Input, BackTop, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import PostItem from '../component/postitem'
import { PictureTwoTone } from '@ant-design/icons'
import logo from '../assets/img/logo.svg'

const { Header, Content, Footer } = Layout
const { Text } = Typography
const data = [
  { name: 'ploy', content: 'สวัสดี' },
  { name: 'ploy1234', content: 'hello' },
  { name: 'ppppp', content: 'asdf' },
  { name: 'ploy', content: 'hi' },
  { name: 'ploy1234', content: 'hello' },
  { name: 'ppppp', content: 'asdf' },
  { name: 'ploy', content: 'hi' },
  { name: 'ploy1234', content: 'hello' },
  { name: 'ppppp', content: 'asdf' },
]
const nname: string = 'namkangkrukrieiei'

const headerStyle: CSSProperties = {
  boxSizing: 'border-box',
  background: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '0.1em',
}
const postStyle: CSSProperties = {
  margin: '3em 1em 0em 1em',
  background: 'white',
  padding: '0 1em',
  borderRadius: '1em',
}
const inputStyle: CSSProperties = {
  background: '#F2F2F2',
  borderRadius: '1em',
}

const Timeline = () => {
  const actions = [<PictureTwoTone />, <span>Upload picture / video</span>]
  return (
    <Layout hasSider={false} style={{ background: '#f0f2f5' }}>
      <Header style={headerStyle}>
        <img src={logo} alt="Tumrai" style={{ maxHeight: '100%', maxWidth: '100%' }} />
        <div style={{ display: 'inline-block' }}>
          <Avatar icon={<UserOutlined />} />
          <Text strong style={{ paddingLeft: '0.5em' }}>
            {nname}
          </Text>
        </div>
      </Header>
      <Content style={{ margin: '0 20%' }}>
        <div style={postStyle}>
          <Comment
            actions={actions}
            avatar={<Avatar icon={<UserOutlined />} />}
            content={<Input placeholder="What's Up" size="middle" style={inputStyle} />}
          />
        </div>
        <br />
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => <PostItem name={item.name} content={item.content} />}
        />
        <BackTop />
      </Content>
      <Footer />
    </Layout>
  )
}
export default Timeline
