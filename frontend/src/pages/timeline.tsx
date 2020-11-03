import React, { CSSProperties, useState, useEffect } from 'react'
import {
  Layout,
  List,
  Avatar,
  Comment,
  Input,
  BackTop,
  Typography,
  Form,
  Button,
  Upload,
  Dropdown,
  Menu,
  Modal,
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import PostItem from '../component/postitem'
import logo from '../assets/img/logo.svg'
import upload from '../assets/img/upload.svg'
import { IPost } from '../services/intf'
import { redirectTo } from '../services/redirect'
import UserListItem from '../component/userlistitem'

interface IFriend {
  id: string
  name: string
}

const { Header, Content, Footer } = Layout
const { Text } = Typography
const { Search } = Input
const data1 = [
  { name: 'ploy', content: 'สวัสดี' },
  { name: 'ploy1234', content: 'hello' },
]
const dataFollowing = [
  { name: 'ploy', id: '123456' },
  { name: 'pinn', id: '165485' },
]
const dataFollower = [
  { name: 'namkang', id: '456789' },
  { name: 'velody', id: '458889' },
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
  const [following, setFollowing] = useState([])
  const [follower, setFollower] = useState([])
  const [followingVisible, setFollowingVisible] = useState(false)
  const [followerVisible, setFollowerVisible] = useState(false)

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
    setFollowingVisible(true)
  }
  const showFollower = () => {
    setFollowerVisible(true)
  }
  const handleClose = () => {
    setFollowingVisible(false)
    setFollowerVisible(false)
  }
  const fetchTimeline = () => {
    setData(data1)
    setFollowing(['pinn', 'ploy'])
    setFollower(['namkang'])
    setLoading(false)
  }
  useEffect(() => {
    fetchTimeline()
  }, [])
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
              <Menu style={{ width: 150, marginTop: '0.5rem' }}>
                <Menu.Item>
                  <a onClick={showFollowing}>
                    <span style={{ color: '#A55FC1' }}>{following.length}</span> Following
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a onClick={showFollower}>
                    <span style={{ color: '#A55FC1' }}>{follower.length}</span> Followers
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

          <Modal
            title={
              <span style={{ fontWeight: 'bold' }}>
                Following <span style={{ color: '#A55FC1' }}>{following.length}</span>
              </span>
            }
            visible={followingVisible}
            footer={null}
            onCancel={handleClose}
          >
            <List
              itemLayout="horizontal"
              loading={loading}
              dataSource={dataFollowing}
              renderItem={(item: IFriend) => <UserListItem id={item.id} name={item.name} />}
            />
          </Modal>
          <Modal
            title={
              <span style={{ fontWeight: 'bold' }}>
                Followers <span style={{ color: '#A55FC1' }}>{follower.length}</span>
              </span>
            }
            visible={followerVisible}
            footer={null}
            onCancel={handleClose}
          >
            <List
              itemLayout="horizontal"
              loading={loading}
              dataSource={dataFollower}
              renderItem={(item: IFriend) => <UserListItem id={item.id} name={item.name} />}
            />
          </Modal>
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
