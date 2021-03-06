import React, { CSSProperties, useState, useEffect } from 'react'
import { Layout, List, Avatar, Comment, Input, BackTop, Form, Button, Upload, Typography } from 'antd'
import PostItem from '../component/postitem'
import upload from '../assets/img/upload.svg'
import { IPost } from '../services/intf'
import MainHeader from '../component/mainheader'
import Modal from 'antd/lib/modal/Modal'
import { timeline } from '../services/api'
import Avatar1 from '../assets/img/avatar-1.jpg'
import Avatar2 from '../assets/img/avatar-2.jpg'
import Avatar3 from '../assets/img/avatar-3.jpg'
import Avatar4 from '../assets/img/avatar-4.jpg'
import Avatar5 from '../assets/img/avatar-5.jpg'
import Avatar6 from '../assets/img/avatar-6.jpg'
import Avatar7 from '../assets/img/avatar-7.jpg'

interface IUserShow {
  _id: string
  username: string
  displayName: string
}

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7]

const { Content, Footer } = Layout
const { TextArea } = Input
const { Text } = Typography

const postStyle: CSSProperties = {
  margin: '0 1em 0em 1em',
  background: 'white',
  padding: '0 1em',
  borderRadius: '1em',
}
const inputStyle: CSSProperties = {
  background: '#F2F2F2',
  borderRadius: '1em',
}

const Timeline = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<IPost[]>([])
  const [users, setUsers] = useState<IUserShow[]>([])
  const [content, setContent] = useState('')
  const [fileList, setFileList] = useState(null)
  const [visible, setVisible] = useState(false)
  const handleAddPost = () => {
    var formData = new FormData()
    if (fileList) {
      formData.append('data', fileList[0].originFileObj)

      timeline.upload(
        formData,
        ({ data }: any) => {
          var filelocation = data.files[0].location
          var payload
          if (data.files[0].mimetype.indexOf('image') == 0) {
            payload = {
              userId: localStorage.USERID,
              message: content,
              picture: filelocation,
              video: '',
            }
          } else {
            payload = {
              userId: localStorage.USERID,
              message: content,
              picture: '',
              video: filelocation,
            }
          }
          timeline.addPost(
            payload,
            ({ data }: any) => {
              setVisible(false)
              fetchTimeline(0)
            },
            (response: any) => {
              console.log(response.status)
            }
          )
        },
        (response: any) => {
          console.log(response.status)
        }
      )
    } else {
      var payload = {
        userId: localStorage.USERID,
        message: content,
        picture: '',
        video: '',
      }
      timeline.addPost(
        payload,
        ({ data }: any) => {
          setVisible(false)
          fetchTimeline(0)
        },
        (response: any) => {
          console.log(response.status)
        }
      )
    }
  }
  const handleUpload = (values: any) => {
    setFileList(values.fileList)
  }
  const fetchTimeline = (offset: number) => {
    var payload = { userId: localStorage.USERID, limit: 50, offset: offset }
    timeline.fetchTimeline(
      payload,
      ({ data }: any) => {
        setUsers(data.body.users)
        setData(data.body.tweets)
        setLoading(false)
      },
      (response: any) => {
        console.log(response.status)
      }
    )
  }
  const handleWriteStatus = () => {
    setVisible(true)
  }
  const onCancel = () => {
    setVisible(false)
  }
  useEffect(() => {
    fetchTimeline(0)
  }, [])
  return (
    <Layout hasSider={false} style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <MainHeader />
      <Content style={{ margin: '6rem 20% 0 20%' }}>
        <div style={postStyle}>
          <Comment
            avatar={<Avatar icon={<img src={avatars[localStorage.USERNAME.length % avatars.length]} />} />}
            content={
              <>
                <Form name="post-form" onFinish={handleAddPost} onClick={handleWriteStatus}>
                  <Form.Item name="content" style={{ marginBottom: 0 }}>
                    <Input placeholder="What's Up" size="middle" style={inputStyle} />
                  </Form.Item>
                  <img src={upload} alt="Tumrai" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                  <Button type="link" style={{ paddingLeft: 0 }}>
                    Upload picture / video
                  </Button>
                </Form>
              </>
            }
          />
          <Modal
            title={<div style={{ height: '1.5rem' }}></div>}
            visible={visible}
            onCancel={onCancel}
            bodyStyle={{ padding: '1rem' }}
            footer={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                  <Upload listType="picture" onChange={handleUpload} accept=".png,.jpg,.jpeg,.mp4">
                    <img src={upload} alt="Tumrai" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                    <Button type="link">Upload picture / video</Button>
                  </Upload>
                </div>
                <Button type="primary" onClick={handleAddPost}>
                  Post
                </Button>
              </div>
            }
          >
            <div style={{ display: 'flex', width: '100%' }}>
              <Avatar icon={<img src={avatars[localStorage.USERNAME.length % avatars.length]} />} />
              <div style={{ width: '100%' }}>
                <Text style={{ fontSize: '0.9rem', fontWeight: 'bold', paddingLeft: '0.75rem' }}>
                  {localStorage.USERNAME}
                </Text>
                <TextArea
                  rows={2}
                  placeholder="What's Up"
                  bordered={false}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setContent(e.target.value)
                  }}
                />
              </div>
            </div>
          </Modal>
        </div>
        <br />
        <List
          itemLayout="horizontal"
          loading={loading}
          dataSource={data}
          renderItem={(item: IPost, index: number) => (
            <PostItem
              _id={item._id}
              owner={item.owner}
              username={users[index].displayName}
              message={item.message}
              picture={item.picture}
              videos={item.videos}
              created={item.created}
              likes={item.likes}
              islike={item.likes.indexOf(localStorage.USERID) >= 0}
            />
          )}
        />
        <BackTop />
      </Content>
      <Footer />
    </Layout>
  )
}
export default Timeline
