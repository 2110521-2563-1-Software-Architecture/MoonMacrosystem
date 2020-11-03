import React, { CSSProperties, useState, useEffect } from 'react'
import { Layout, List, Avatar, Comment, Input, BackTop, Form, Button, Upload } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import PostItem from '../component/postitem'
import upload from '../assets/img/upload.svg'
import { IPost } from '../services/intf'
import MainHeader from '../component/mainheader'

const { Content, Footer } = Layout

const data1 = [
  { name: 'ploy', content: 'สวัสดี' },
  { name: 'ploy1234', content: 'hello' },
]
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
  const [fileList, setFileList] = useState(null)

  const handleAddPost = (values: any) => {
    //TODO
    console.log(values)
    //Upload file
    var formData = new FormData()
    if (fileList.length != 0) {
      formData.append('picture', fileList)
    }
  }
  const handleUpload = (values: any) => {
    console.log(values)
    setFileList(values.fileList)
  }
  const fetchTimeline = () => {
    setData(data1)
    setLoading(false)
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
            avatar={<Avatar icon={<UserOutlined />} />}
            content={
              <>
                <Form name="post-form" onFinish={handleAddPost}>
                  <Form.Item name="content" style={{ marginBottom: 0 }}>
                    <Input placeholder="What's Up" size="middle" style={inputStyle} />
                  </Form.Item>
                  <img src={upload} alt="Tumrai" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                  <Upload listType="picture" onChange={handleUpload}>
                    <Button type="link" style={{ paddingLeft: 0 }}>
                      Upload picture / video
                    </Button>
                  </Upload>
                  <span style={{ float: 'right', marginTop: '1em' }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </span>
                </Form>
              </>
            }
          />
        </div>
        <br />
        <List
          itemLayout="horizontal"
          loading={loading}
          dataSource={data}
          renderItem={(item: IPost) => <PostItem name={item.name} content={item.content} />}
        />
        <BackTop />
      </Content>
      <Footer />
    </Layout>
  )
}
export default Timeline
