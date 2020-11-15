import React, { useState } from 'react'
import { Avatar, Button, Typography } from 'antd'
import Avatar1 from '../assets/img/avatar-1.jpg'
import Avatar2 from '../assets/img/avatar-2.jpg'
import Avatar3 from '../assets/img/avatar-3.jpg'
import Avatar4 from '../assets/img/avatar-4.jpg'
import Avatar5 from '../assets/img/avatar-5.jpg'
import Avatar6 from '../assets/img/avatar-6.jpg'

interface IFriend {
  id: string
  username: string
}
const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6]
const { Text } = Typography

const UserListItem = ({ id, username }: IFriend) => {
  const [isFollow, setIsFollow] = useState(true)
  const Photo = avatars[Math.floor(Math.random() * avatars.length)]

  const handleOnClick = (e: any) => {
    if (isFollow) {
      setIsFollow(false)
      //TODO unfollow by id
    } else {
      setIsFollow(true)
      //TODO follow by id
    }
  }
  return (
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
  )
}
export default UserListItem
