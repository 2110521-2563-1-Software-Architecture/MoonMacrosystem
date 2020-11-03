import React, { CSSProperties, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, List, Avatar, Comment, Input, BackTop, Typography, Form, Button, Upload, Dropdown, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import PostItem from '../component/postitem'
import logo from '../assets/img/logo.svg'
import upload from '../assets/img/upload.svg'
import { IPost } from '../services/intf'
import { redirectTo } from '../services/redirect'

const { Header, Content, Footer } = Layout
const { Text } = Typography
const { Search } = Input
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
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<IPost[]>([])
  const [fileList, setFileList] = useState(null)
  const [follwing, setFollwing] = useState(null)
  const [follwer, setFollwer] = useState(null)

  const handleLogOut = () => {
    localStorage.setItem('ACCESS_TOKEN', 'false')
    redirectTo('/')
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
  const onSearch = (values: String) => {
    console.log(values)
    //TODO
  }
  const showFollowing = () => {
    //TODO
  }
  const showFollower = () => {
    //TODO
  }
  const fetchTimeline = () => {
    setData(data1)
    setFollwing(14)
    setFollwer(8)
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
          <Search
            placeholder="Find your friends"
            onSearch={onSearch}
            style={{ width: 300, height: 32, marginLeft: 10 }}
          />
        </div>
        <div style={{ display: 'inline-block' }}>
          <Dropdown
            overlay={
              <Menu style={{ width: 150 }}>
                <Menu.Item>
                  <a onClick={showFollowing}>
                    <span style={{ color: '#A55FC1' }}>{follwing}</span> Following
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a onClick={showFollower}>
                    <span style={{ color: '#A55FC1' }}>{follwer}</span> Followers
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a onClick={handleLogOut}>Log Out</a>
                </Menu.Item>
              </Menu>
            }
            placement="bottomRight"
          >
            <span>
              <Avatar icon={<UserOutlined />} />
              <Text strong style={{ paddingLeft: '0.5em' }}>
                {localStorage.getItem('USERNAME')}
              </Text>
            </span>
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
