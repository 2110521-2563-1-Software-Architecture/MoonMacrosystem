import React, { CSSProperties, useState, useEffect } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { List, Avatar, Typography, Dropdown, Menu, Modal, Input } from 'antd'
import logo from '../assets/img/logo.svg'
import { redirectTo } from '../services/redirect'
import UserListItem from '../component/userlistitem'

interface IFriend {
  id: string
  name: string
}
const dataFollowing = [
  { name: 'ploy', id: '123456' },
  { name: 'pinn', id: '165485' },
]
const dataFollower = [
  { name: 'namkang', id: '456789' },
  { name: 'velody', id: '458889' },
]
const { Text } = Typography
const { Search } = Input

const headerStyle: CSSProperties = {
  boxSizing: 'border-box',
  background: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  position: 'fixed',
  zIndex: 1,
  alignItems: 'center',
  height: '64px',
  paddingLeft: '20%',
  paddingRight: '20%',
}
const MainHeader = () => {
  const [loading, setLoading] = useState(true)
  const [following, setFollowing] = useState([])
  const [follower, setFollower] = useState([])
  const [followingVisible, setFollowingVisible] = useState(false)
  const [followerVisible, setFollowerVisible] = useState(false)

  const handleLogOut = () => {
    localStorage.setItem('ACCESS_TOKEN', 'false')
    redirectTo('/')
  }
  const onSearch = (values: String) => {
    console.log(values)
    //TODO
    redirectTo('/result')
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
  useEffect(() => {
    //TODO fetch friend
    setFollower(dataFollower)
    setFollowing(dataFollowing)
    setLoading(false)
  }, [])
  return (
    <div style={headerStyle}>
      <img src={logo} alt="Tumrai" style={{ maxHeight: '100%', maxWidth: '100%' }} />
      <div style={{ display: 'inline-block' }}>
        <Search
          placeholder="Find your friends"
          onSearch={onSearch}
          style={{ width: 300, height: 32, marginLeft: 10 }}
        />
      </div>
      <div style={{ display: 'inline-block', paddingRight: '1rem' }}>
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
    </div>
  )
}
export default MainHeader
