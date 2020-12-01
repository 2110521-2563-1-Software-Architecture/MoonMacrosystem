import React, { useState, createElement, CSSProperties, useEffect } from 'react'
import {
  Avatar,
  Comment,
  List,
  Tooltip,
  Typography,
  Form,
  Button,
  Input,
  Menu,
  Dropdown,
  Image,
  Modal,
  message as AntMessage,
} from 'antd'
import moment from 'moment'
import { LikeOutlined, LikeFilled } from '@ant-design/icons'
import { IPost } from '../services/intf'
import CommentItem from './commentitem'
import BinIcon from '../assets/img/bin.svg'
import Avatar1 from '../assets/img/avatar-1.jpg'
import Avatar2 from '../assets/img/avatar-2.jpg'
import Avatar3 from '../assets/img/avatar-3.jpg'
import Avatar4 from '../assets/img/avatar-4.jpg'
import Avatar5 from '../assets/img/avatar-5.jpg'
import Avatar6 from '../assets/img/avatar-6.jpg'
import Avatar7 from '../assets/img/avatar-7.jpg'
import { friend, timeline } from '../services/api'

interface IPostItem {
  _id: string
  owner: string
  username: string
  message: string
  picture: string[]
  videos: string[]
  likes: string[]
  created: string
  islike: boolean
}
interface IComment {
  owner: string
  message: string
  created: string
  _id: string
}

interface IUserShow {
  _id: string
  username: string
  displayName: string
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
  display: 'flex',
}
const inputStyle: CSSProperties = {
  background: '#F2F2F2',
  borderRadius: '1em',
  marginRight: '1em',
}

const PostItem = ({ _id, owner, username, message, picture, videos, created, likes, islike }: IPostItem) => {
  const [likeN, setLikeN] = useState(likes.length)
  const [isLike, setIsLike] = useState(islike)
  const [comments, setComments] = useState<IComment[]>([])
  const [hasComment, setHasComment] = useState(false)
  const [mycomment, setMycomment] = useState('')
  const [users, setUsers] = useState<IUserShow[]>([])
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [isShow, setisShow] = useState(true)

  const Photo = avatars[username.length % avatars.length]

  const handleWriteStatus = () => {
    setVisible(true)
  }
  const onCancel = () => {
    setVisible(false)
  }
  const like = () => {
    var payload
    if (isLike) {
      setLikeN(likeN - 1)
      setIsLike(false)
      payload = { userId: localStorage.USERID, tweetId: _id }
      timeline.updateUnlike(
        payload,
        ({ data }: any) => {},
        (response: any) => {
          console.log(response.status)
        }
      )
    } else {
      setLikeN(likeN + 1)
      setIsLike(true)

      payload = { userId: localStorage.USERID, tweetId: _id }
      timeline.updateLike(
        payload,
        ({ data }: any) => {},
        (response: any) => {
          console.log(response.status)
        }
      )
    }
  }
  const reply = () => {
    hasComment ? setHasComment(false) : setHasComment(true)
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(isLike ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likeN}</span>
      </span>
    </Tooltip>,
    <span onClick={reply}>Replies</span>,
  ]

  const fetchcomment = () => {
    var payload = { tweetId: _id }
    timeline.fetchComment(
      payload,
      ({ data }: any) => {
        setUsers(data.body.users)
        setComments(data.body.comments)
        setLoading(false)
      },
      (response: any) => {
        console.log(response.status)
      }
    )
  }
  const handleAddComment = () => {
    //TODO add comment + show new comment
    var payload = {
      userId: localStorage.USERID,
      tweetId: _id,
      message: mycomment,
    }
    timeline.addComment(
      payload,
      ({ data }: any) => {
        setVisible(false)
        fetchcomment()
      },
      (response: any) => {
        console.log(response.status)
      }
    )
  }
  const handleUnfollow = () => {
    //TODO unfollow
    var payload = { userId: localStorage.USERID, targetId: owner }
    friend.updateUnfollow(
      payload,
      ({ data }: any) => {
        console.log('data', data)
      },
      (response: any) => {}
    )
  }
  const handleDelete = () => {
    var payload = { userId: localStorage.USERID, tweetId: _id }
    timeline.deletePost(
      payload,
      ({ data }: any) => {
        AntMessage.success('Delete your post success!')
        setisShow(false)
      },
      (response: any) => {
        AntMessage.error('Cannot delete this post. Please try again.')
      }
    )
  }
  useEffect(() => {
    fetchcomment()
  }, [])
  return isShow ? (
    <div style={postStyle}>
      <Comment
        style={{ width: '100%' }}
        actions={actions}
        author={
          <Dropdown
            overlay={
              <Menu style={{ textAlign: 'center' }}>
                <Menu.Item>
                  <a onClick={handleUnfollow}>Unfollow</a>
                </Menu.Item>
              </Menu>
            }
            placement="topCenter"
            arrow={true}
          >
            <Text style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{username}</Text>
          </Dropdown>
        }
        avatar={<Avatar icon={<img src={Photo} />} />}
        content={
          <div style={{ display: 'block' }}>
            <div>
              <Text style={{ fontSize: '0.9rem' }}>{message}</Text>
            </div>
            {picture.length > 0 && picture[0].length > 0 ? (
              <div style={{ paddingTop: '1rem' }}>
                <Image src={picture[0]} alt="image" style={{ maxWidth: '10rem', maxHeight: '10rem' }} />
              </div>
            ) : (
              <></>
            )}
            {videos.length > 0 && videos[0].length > 0 ? (
              <div>
                <video width="320" height="200" controls>
                  <source src={videos[0]} type="video/mp4" />
                </video>
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
                  renderItem={(item: IComment, index: number) => (
                    <CommentItem
                      _id={item._id}
                      owner={item.owner}
                      username={users[index].displayName}
                      message={item.message}
                      created={item.created}
                      postid={_id}
                    />
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
export default PostItem
