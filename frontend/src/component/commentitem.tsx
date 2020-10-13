import React from 'react'
import { Avatar, Comment, Tooltip, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import moment from 'moment'
import { IPost } from '../services/intf'

const { Text } = Typography
const CommentItem = ({ name, content }: IPost) => {
  return (
    <Comment
      author={<Text style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{name}</Text>}
      avatar={<Avatar icon={<UserOutlined />} />}
      content={<Text style={{ fontSize: '0.9rem' }}>{content}</Text>}
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  )
}
export default CommentItem
