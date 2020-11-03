import React from 'react'
import { Avatar, Button, Comment, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

interface IFriend {
  id: string
  name: string
}

const { Text } = Typography

const UserListItem = ({ id, name }: IFriend) => {
  const handleUnfollow = (e: any) => {
    //TODO unfollow by id
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
      <Button type="default" onClick={handleUnfollow}>
        Unfollow
      </Button>
    </div>
  )
}
export default UserListItem
