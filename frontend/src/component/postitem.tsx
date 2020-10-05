import React, { useState, createElement } from 'react'
import { Avatar, Comment, Tooltip } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import moment from 'moment'
import { LikeOutlined, LikeFilled } from '@ant-design/icons'
import { postIntf } from '../services/intf'

const PostItem = ({ name, content }: postIntf) => {
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
    <Comment
      actions={actions}
      author={<a>{name}</a>}
      avatar={<Avatar icon={<UserOutlined />} />}
      content={<p>{content}</p>}
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  )
}
export default PostItem
