import React, { useState } from 'react'
import { Avatar, Button, Comment, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

interface IFriend {
  id: string
  name: string
}

const { Text } = Typography

const UserListItem = ({ id, name }: IFriend) => {
  const [isFollow, setIsFollow] = useState(true)

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
        <Avatar icon={<UserOutlined />} />
        <Text style={{ fontSize: '0.9rem', fontWeight: 'bold', paddingLeft: '1rem' }}>{name}</Text>
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
