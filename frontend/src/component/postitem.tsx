import React, { useState, createElement, CSSProperties, useEffect } from 'react'
import { Avatar, Comment, List, Tooltip, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import moment from 'moment'
import { LikeOutlined, LikeFilled } from '@ant-design/icons'
import { IPost } from '../services/intf'
import CommentItem from './commentitem'

const { Text } = Typography

const postStyle: CSSProperties = {
  margin: '1em',
  background: 'white',
  padding: '0 1em',
  borderRadius: '1em',
}

const PostItem = ({ name, content }: IPost) => {
  const [likes, setLikes] = useState(0)
  const [action, setAction] = useState(null)

  const like = () => {
    if (action === 'liked') {
      setLikes(likes - 1)
      setAction('null')
    } else {
      setLikes(likes + 1)
      setAction('liked')
    }
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Replies</span>,
  ]

  return (
    <div style={postStyle}>
      <Comment
        actions={actions}
        author={<Text style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{name}</Text>}
        avatar={<Avatar icon={<UserOutlined />} />}
        content={<Text style={{ fontSize: '0.9rem' }}>{content}</Text>}
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span style={{ fontSize: '0.8rem' }}>{moment().fromNow()}</span>
          </Tooltip>
        }
        children={<CommentItem name="test" content="55555" />}
      />
    </div>
  )
}
export default PostItem
