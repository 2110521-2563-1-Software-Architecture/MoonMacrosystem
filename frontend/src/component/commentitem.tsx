import React from 'react'
import { Avatar, Comment, Tooltip, Typography } from 'antd'
import moment from 'moment'
import Avatar1 from '../assets/img/avatar-1.jpg'
import Avatar2 from '../assets/img/avatar-2.jpg'
import Avatar3 from '../assets/img/avatar-3.jpg'
import Avatar4 from '../assets/img/avatar-4.jpg'
import Avatar5 from '../assets/img/avatar-5.jpg'
import Avatar6 from '../assets/img/avatar-6.jpg'
import Avatar7 from '../assets/img/avatar-7.jpg'
interface IComment {
  owner: string
  message: string
  created: string
}

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7]

const { Text } = Typography
const CommentItem = ({ owner, message, created }: IComment) => {
  const Photo = avatars[owner.length % avatars.length]

  return (
    <Comment
      author={<Text style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{owner}</Text>}
      avatar={<Avatar icon={<img src={Photo} />} />}
      content={<Text style={{ fontSize: '0.9rem' }}>{message}</Text>}
      datetime={<span>{moment(created).fromNow()}</span>}
    />
  )
}
export default CommentItem
