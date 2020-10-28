import React, { useState, createElement, CSSProperties } from 'react'
import { Avatar, Comment, List, Tooltip, Typography, Form, Button, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import moment from 'moment'
import { LikeOutlined, LikeFilled } from '@ant-design/icons'
import { IPost } from '../services/intf'
import CommentItem from './commentitem'

const { Text } = Typography
const boxStyle: CSSProperties = {
  boxSizing: 'border-box',
  background: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '0.1em',
}
const postStyle: CSSProperties = {
  margin: '1em',
  background: 'white',
  padding: '0 1em',
  borderRadius: '1em',
}
const inputStyle: CSSProperties = {
  background: '#F2F2F2',
  borderRadius: '1em',
  marginRight: '1em',
}
const mockcomment = [
  { name: 'test', content: '!!!' },
  { name: 'test1234', content: 'hello' },
]
const PostItem = ({ name, content }: IPost) => {
  const [likes, setLikes] = useState(0)
  const [action, setAction] = useState(null)
  //use IPost instead of IComment
  const [comments, setComments] = useState<IPost[]>([])
  const [hasComment, setHasComment] = useState(false)
  const [loading, setLoading] = useState(true)

  const like = () => {
    if (action === 'liked') {
      setLikes(likes - 1)
      setAction('null')
    } else {
      setLikes(likes + 1)
      setAction('liked')
    }
    // TODO Update like of post
    console.log('Update like / unlike')
  }
  const reply = () => {
    hasComment ? setHasComment(false) : fetchcomment('')
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <span onClick={reply}>Replies</span>,
  ]

  const fetchcomment = (postid: string) => {
    //TODO fetch comment of post
    setComments(mockcomment)
    setLoading(false)
    setHasComment(true)
  }
  const handleAddComment = (values: any) => {
    // TODO add comment + show new comment
    console.log(values)
  }

  return (
    <div style={postStyle}>
      <Comment
        actions={actions}
        author={<Text style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{name}</Text>}
        avatar={<Avatar icon={<UserOutlined />} />}
        content={
          <div style={{ display: 'block' }}>
            <div>
              <Text style={{ fontSize: '0.9rem' }}>{content}</Text>
            </div>
            <div style={{ textAlign: 'center' }}>{/* TODO show image / video */}</div>
          </div>
        }
        datetime={<span style={{ fontSize: '0.8rem' }}>{moment().fromNow()}</span>}
        children={
          hasComment && (
            <>
              <List
                itemLayout="horizontal"
                size="small"
                loading={loading}
                dataSource={comments}
                renderItem={(item: IPost) => <CommentItem name={item.name} content={item.content} />}
              />
              <Comment
                avatar={<Avatar icon={<UserOutlined />} />}
                content={
                  <>
                    <Form name="comment-form" onFinish={handleAddComment}>
                      <Form.Item name="content" style={{ marginBottom: 0 }}>
                        <div style={boxStyle}>
                          <Input placeholder="What's You Think" size="middle" style={inputStyle} />
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </div>
                      </Form.Item>
                    </Form>
                  </>
                }
              />
            </>
          )
        }
      />
    </div>
  )
}
export default PostItem
