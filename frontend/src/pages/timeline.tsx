import React, { CSSProperties, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, List, Avatar, Comment, Input, BackTop, Typography, Form, Button, Upload, Dropdown, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import PostItem from '../component/postitem'
import logo from '../assets/img/logo.svg'
import upload from '../assets/img/upload.svg'
import { IPost } from '../services/intf'

const { Header, Content, Footer } = Layout
const { Text } = Typography
const data1 = [
  { name: 'ploy', content: 'สวัสดี' },
  { name: 'ploy1234', content: 'hello' },
]

const headerStyle: CSSProperties = {
  boxSizing: 'border-box',
  background: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  position: 'fixed',
  zIndex: 1,
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
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<IPost[]>([])
  const [fileList, setFileList] = useState(null)

  const handleLogOut = () => {
    localStorage.setItem('ACCESS_TOKEN', 'false')
    history.push('/')
  }
  const handleAddPost = (values: any) => {
    //TODO
    console.log(values)
    //Upload file
    var formData = new FormData()
    if (fileList.length != 0) {
      formData.append('picture', fileList)
    }
  }
  const handleUpload = (values: any) => {
    console.log(values)
    setFileList(values.fileList)
  }
  const fetchTimeline = () => {
    setData(data1)
    setLoading(false)
  }
  useEffect(() => {
    fetchTimeline()
  })
  return (
    <Layout hasSider={false} style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={headerStyle}>
        <img src={logo} alt="Tumrai" style={{ maxHeight: '100%', maxWidth: '100%' }} />
        <div style={{ display: 'inline-block' }}>
          <Avatar icon={<UserOutlined />} />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <a onClick={handleLogOut}>Log Out</a>
                </Menu.Item>
              </Menu>
            }
            placement="bottomRight"
            arrow={true}
          >
            <Text strong style={{ paddingLeft: '0.5em' }}>
              {localStorage.getItem('USERNAME')}
            </Text>
          </Dropdown>
        </div>
      </Header>
      <Content style={{ margin: '3rem 20% 0 20%' }}>
        <div style={postStyle}>
          <Comment
            avatar={<Avatar icon={<UserOutlined />} />}
            content={
              <>
                <Form name="post-form" onFinish={handleAddPost}>
                  <Form.Item name="content" style={{ marginBottom: 0 }}>
                    <Input placeholder="What's Up" size="middle" style={inputStyle} />
                  </Form.Item>
                  <img src={upload} alt="Tumrai" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                  <Upload listType="picture" onChange={handleUpload}>
                    <Button type="link" style={{ paddingLeft: 0 }}>
                      Upload picture / video
                    </Button>
                  </Upload>
                  <span style={{ float: 'right', marginTop: '1em' }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </span>
                </Form>
              </>
            }
          />
        </div>
        <br />
        <List
          itemLayout="horizontal"
          loading={loading}
          dataSource={data}
          renderItem={(item: IPost) => <PostItem name={item.name} content={item.content} />}
        />
        <BackTop />
      </Content>
      <Footer />
    </Layout>
  )
}
export default Timeline
