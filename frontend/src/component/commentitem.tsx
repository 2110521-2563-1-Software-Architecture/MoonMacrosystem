import React, { useState } from 'react'
import { Avatar, Comment, Tooltip, Typography, message as AntMessage } from 'antd'
import moment from 'moment'
import Avatar1 from '../assets/img/avatar-1.jpg'
import Avatar2 from '../assets/img/avatar-2.jpg'
import Avatar3 from '../assets/img/avatar-3.jpg'
import Avatar4 from '../assets/img/avatar-4.jpg'
import Avatar5 from '../assets/img/avatar-5.jpg'
import Avatar6 from '../assets/img/avatar-6.jpg'
import Avatar7 from '../assets/img/avatar-7.jpg'
import BinIcon from '../assets/img/bin.svg'
import { timeline } from '../services/api'

interface IComment {
  owner: string
  username: string
  message: string
  created: string
  _id: string
  postid: string
}

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7]

const { Text } = Typography

const CommentItem = ({ _id, owner, username, message, created, postid }: IComment) => {
  const [isShow, setisShow] = useState(true)

  const Photo = avatars[owner.length % avatars.length]
  const handleDelete = () => {
    var payload = { userId: localStorage.USERID, tweetId: postid, commentId: _id }
    timeline.deleteComment(
      payload,
      ({ data }: any) => {
        AntMessage.success('Delete your comment success!')
        setisShow(false)
      },
      (response: any) => {
        console.log(response)
        AntMessage.error('Cannot delete this comment. Please try again.')
      }
    )
  }

  return isShow ? (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Comment
        author={<Text style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{username}</Text>}
        avatar={<Avatar icon={<img src={Photo} />} />}
        content={<Text style={{ fontSize: '0.9rem' }}>{message}</Text>}
        datetime={<span>{moment(created).fromNow()}</span>}
      />
      {owner == localStorage.USERID && (
        <span onClick={handleDelete}>
          <img src={BinIcon} alt="bin" style={{ paddingTop: '1rem' }} />
        </span>
      )}
    </div>
  ) : (
    <></>
  )
}
export default CommentItem
