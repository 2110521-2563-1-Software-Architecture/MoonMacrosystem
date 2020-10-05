import React from 'react'
import { Avatar, Comment, Tooltip } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import moment from 'moment'
import { postIntf } from '../services/intf'

const CommentItem = ({ name, content }: postIntf) => {
  return (
    <Comment
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
export default CommentItem
