import React, { CSSProperties, useState, useEffect } from 'react'
import { List, Avatar, Typography, Dropdown, Menu, Modal, Input } from 'antd'
import logo from '../assets/img/logo.svg'
import { redirectTo } from '../services/redirect'
import UserListItem from '../component/userlistitem'
import { friend } from '../services/api'
import Avatar1 from '../assets/img/avatar-1.jpg'
import Avatar2 from '../assets/img/avatar-2.jpg'
import Avatar3 from '../assets/img/avatar-3.jpg'
import Avatar4 from '../assets/img/avatar-4.jpg'
import Avatar5 from '../assets/img/avatar-5.jpg'
import Avatar6 from '../assets/img/avatar-6.jpg'
import Avatar7 from '../assets/img/avatar-7.jpg'

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7]

interface IFriend {
  id: string
  username: string
}

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
    //TODO redirect to searchresult page with searchstr
    redirectTo(`/result`)
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
  const checkIsFollow = (val: string) => {
    for (var i = 0; i < following.length; i++) {
      if (following[i].username == val) {
        return true
      }
    }
    return false
  }
  const fetchFriends = () => {
    //TODO fetch friend
    var payload = { username: localStorage.USERNAME }
    friend.fetchFollow(
      payload,
      ({ data }: any) => {
        setFollower(data.followers)
        setFollowing(data.followings)
        setLoading(false)
      },
      (response: any) => {
        console.log(response)
      }
    )
  }
  useEffect(() => {
    fetchFriends()
  }, [])
  return (
    <div style={headerStyle}>
      <img
        src={logo}
        alt="Tumrai"
        style={{ maxHeight: '100%', maxWidth: '100%' }}
        onClick={() => {
          redirectTo('/home')
        }}
      />

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
            <Avatar icon={<img src={avatars[localStorage.USERNAME.length % avatars.length]} />} />
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
            dataSource={following}
            renderItem={(item: IFriend) => <UserListItem id={item.id} username={item.username} isfollow={true} />}
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
            dataSource={follower}
            renderItem={(item: IFriend) => (
              <UserListItem id={item.id} username={item.username} isfollow={checkIsFollow(item.username)} />
            )}
          />
        </Modal>
      </div>
    </div>
  )
}
export default MainHeader
