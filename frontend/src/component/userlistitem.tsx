import React, { useState } from 'react'
import { Avatar, Button, Typography } from 'antd'
import Avatar1 from '../assets/img/avatar-1.jpg'
import Avatar2 from '../assets/img/avatar-2.jpg'
import Avatar3 from '../assets/img/avatar-3.jpg'
import Avatar4 from '../assets/img/avatar-4.jpg'
import Avatar5 from '../assets/img/avatar-5.jpg'
import Avatar6 from '../assets/img/avatar-6.jpg'
import Avatar7 from '../assets/img/avatar-7.jpg'
import { friend } from '../services/api'
interface IFriendItem {
  id: string
  username: string
  isfollow: boolean
}
const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7]
const { Text } = Typography

const UserListItem = ({ id, username, isfollow }: IFriendItem) => {
  const [isFollow, setIsFollow] = useState(isfollow)
  const Photo = avatars[username.length % avatars.length]

  const handleOnClick = (e: any) => {
    if (isFollow) {
      setIsFollow(false)
      if (localStorage.USERID !== id) {
        var payload = { userId: localStorage.USERID, targetId: id }
        friend.updateUnfollow(
          payload,
          ({ data }: any) => {},
          (response: any) => {}
        )
      }
    } else {
      setIsFollow(true)
      if (localStorage.USERID !== id) {
        var payload = { userId: localStorage.USERID, targetId: id }
        friend.updateFollow(
          payload,
          ({ data }: any) => {},
          (response: any) => {}
        )
      }
    }
  }
  return (
    <>
      {localStorage.USERID !== id && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem',
          }}
        >
          <div>
            <Avatar icon={<img src={Photo} />} />
            <Text style={{ fontSize: '0.9rem', fontWeight: 'bold', paddingLeft: '1rem' }}>{username}</Text>
          </div>
          {isFollow ? (
            <Button type="default" onClick={handleOnClick}>
              Unfollow
            </Button>
          ) : (
            <Button type="primary" onClick={handleOnClick}>
              Follow
            </Button>
          )}
        </div>
      )}
    </>
  )
}
export default UserListItem
