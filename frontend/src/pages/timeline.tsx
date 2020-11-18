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
  const [content, setContent] = useState('')
  const [fileList, setFileList] = useState(null)
  const [visible, setVisible] = useState(false)
  const handleAddPost = () => {
    //TODO Upload file
    var formData = new FormData()
    var files: string[] = []
    // if (fileList) {
    //   for (var i = 0; i < fileList.length; i++) {
    //     console.log(fileList[i].originFileObj)
    //     formData.append('data', fileList[i].originFileObj)

    //     timeline.upload(
    //       formData,
    //       ({ data }: any) => {
    //         console.log(data)
    //         files.push(data.location)
    //       },
    //       (response: any) => {
    //         console.log(response.status)
    //       }
    //     )
    //   }
    // }
    //TODO add post
    var payload = {
      owner: localStorage.USERNAME,
      message: content,
      files: files,
    }
    timeline.addPost(
      payload,
      ({ data }: any) => {
        setVisible(false)
      },
      (response: any) => {
        console.log(response)
      }
    )
  }
  const handleUpload = (values: any) => {
    setFileList(values.fileList)
  }
  const fetchTimeline = () => {
    //TODO fetch timeline
    var payload = { username: localStorage.USERNAME }
    timeline.fetchTimeline(
      payload,
      ({ data }: any) => {
        setData(data)
        setLoading(false)
      },
      (response: any) => {
        console.log(response)
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
    fetchTimeline()
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
                  <img src={upload} alt="Tumrai" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                  <Upload listType="picture" onChange={handleUpload}>
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
          renderItem={(item: IPost) => (
            <PostItem
              id={item.id}
              owner={item.owner}
              message={item.message}
              picture={item.picture}
              created={item.created}
              likes={item.likes}
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
