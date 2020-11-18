import React, { useState, createElement, CSSProperties, useEffect } from 'react'
import { Avatar, Comment, List, Tooltip, Typography, Form, Button, Input, Menu, Dropdown, Image, Modal } from 'antd'
import moment from 'moment'
import { LikeOutlined, LikeFilled } from '@ant-design/icons'
import { IPost } from '../services/intf'
import CommentItem from './commentitem'
import Avatar1 from '../assets/img/avatar-1.jpg'
import Avatar2 from '../assets/img/avatar-2.jpg'
import Avatar3 from '../assets/img/avatar-3.jpg'
import Avatar4 from '../assets/img/avatar-4.jpg'
import Avatar5 from '../assets/img/avatar-5.jpg'
import Avatar6 from '../assets/img/avatar-6.jpg'
import Avatar7 from '../assets/img/avatar-7.jpg'
import { friend, timeline } from '../services/api'

interface IComment {
  owner: string
  message: string
  created: string
}

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7]

const { Text } = Typography
const { TextArea } = Input

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

const PostItem = ({ owner, message, picture, created }: IPost) => {
  const [likes, setLikes] = useState(0)
  const [action, setAction] = useState(null)
  const [comments, setComments] = useState<IComment[]>([])
  const [hasComment, setHasComment] = useState(false)
  const [mycomment, setMycomment] = useState('')
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)

  const Photo = avatars[owner.length % avatars.length]

  const handleWriteStatus = () => {
    setVisible(true)
  }
  const onCancel = () => {
    setVisible(false)
  }
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
    hasComment ? setHasComment(false) : setHasComment(true)
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
    var payload = { postid: postid }
    timeline.fetchComment(
      payload,
      ({ data }: any) => {
        setComments(data)
        setLoading(false)
      },
      (response: any) => {
        console.log(response)
      }
    )
  }
  const handleAddComment = () => {
    //TODO add comment + show new comment
    var payload = {
      owner: localStorage.USERNAME,
      message: mycomment,
    }
    timeline.addComment(
      payload,
      ({ data }: any) => {
        setVisible(false)
      },
      (response: any) => {
        console.log(response)
      }
    )
  }
  const handleUnfollow = () => {
    //TODO unfollow
    var payload = { owner: localStorage.USERNAME, username: owner }
    friend.updateUnfollow(
      payload,
      ({ data }: any) => {
        console.log(data)
      },
      (response: any) => {}
    )
  }
  useEffect(() => {
    fetchcomment('')
  }, [])
  return (
    <div style={postStyle}>
      <Comment
        actions={actions}
        author={
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <a onClick={handleUnfollow}>Unfollow</a>
                </Menu.Item>
              </Menu>
            }
            placement="topCenter"
            arrow={true}
          >
            <Text style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{owner}</Text>
          </Dropdown>
        }
        avatar={<Avatar icon={<img src={Photo} />} />}
        content={
          <div style={{ display: 'block' }}>
            <div>
              <Text style={{ fontSize: '0.9rem' }}>{message}</Text>
            </div>
            {picture.length != 0 ? (
              <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
                <List
                  dataSource={picture}
                  grid={{ gutter: 16 }}
                  renderItem={(item: string) => (
                    <List.Item>
                      <Image src={item} style={{ maxWidth: '8rem', maxHeight: '8rem' }} />
                    </List.Item>
                  )}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        }
        datetime={<span style={{ fontSize: '0.8rem' }}>{moment(created).fromNow()}</span>}
        children={
          hasComment && (
            <>
              {comments.length != 0 && (
                <List
                  itemLayout="horizontal"
                  size="small"
                  loading={loading}
                  dataSource={comments}
                  renderItem={(item: IPost) => (
                    <CommentItem owner={item.owner} message={item.message} created={item.created} />
                  )}
                />
              )}
              <Comment
                avatar={<Avatar icon={<img src={avatars[localStorage.USERNAME.length % avatars.length]} />} />}
                content={
                  <>
                    <Form name="comment-form" onFinish={handleAddComment} onClick={handleWriteStatus}>
                      <Form.Item name="content" style={{ marginBottom: 0 }}>
                        <div style={boxStyle}>
                          <Input placeholder="What's You Think" size="middle" style={inputStyle} />
                        </div>
                      </Form.Item>
                    </Form>
                  </>
                }
              />
              <Modal
                title={<div style={{ height: '1.5rem' }}></div>}
                visible={visible}
                onCancel={onCancel}
                onOk={handleAddComment}
                okText="Post"
                bodyStyle={{ padding: '1rem' }}
              >
                <div style={{ display: 'flex', width: '100%' }}>
                  <Avatar icon={<img src={avatars[localStorage.USERNAME.length % avatars.length]} />} />
                  <div style={{ width: '100%' }}>
                    <Text style={{ fontSize: '0.9rem', fontWeight: 'bold', paddingLeft: '0.75rem' }}>
                      {localStorage.USERNAME}
                    </Text>
                    <TextArea
                      rows={2}
                      placeholder="What's You Think"
                      bordered={false}
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setMycomment(e.target.value)
                      }}
                    />
                  </div>
                </div>
              </Modal>
            </>
          )
        }
      />
    </div>
  )
}
export default PostItem
