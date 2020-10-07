import React, { CSSProperties } from 'react'
import { Layout, List, Avatar, Comment, Input, BackTop } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import PostItem from '../component/postitem'
import { PictureTwoTone } from '@ant-design/icons'

const { Header, Footer, Sider, Content } = Layout
const data = [
  { name: 'ploy', content: 'hi' },
  { name: 'ploy1234', content: 'hello' },
  { name: 'ppppp', content: 'asdf' },
  { name: 'ploy', content: 'hi' },
  { name: 'ploy1234', content: 'hello' },
  { name: 'ppppp', content: 'asdf' },
  { name: 'ploy', content: 'hi' },
  { name: 'ploy1234', content: 'hello' },
  { name: 'ppppp', content: 'asdf' },
]

const postStyle: CSSProperties = {
  margin: '1em',
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
    <Layout>
      <Header>Header</Header>
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
    </Layout>
  )
}
export default Timeline
