import React, { CSSProperties, useState, useEffect } from 'react'
import { Layout, List, Avatar, Comment, Input, BackTop, Form, Button, Upload, Typography } from 'antd'
import PostItem from '../component/postitem'
import { IPost } from '../services/intf'
import MainHeader from '../component/mainheader'
import UserListItem from '../component/userlistitem'

interface IFriend {
  id: string
  name: string
}

const { Content, Footer } = Layout
const { Text } = Typography

const data1 = [
  { name: 'ploy', id: '123456' },
  { name: 'pinn', id: '165485' },
  { name: 'namkang', id: '456789' },
  { name: 'velody', id: '458889' },
]

const inputStyle: CSSProperties = {
  background: '#F2F2F2',
  borderRadius: '1em',
}

const SearchResult = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<IFriend[]>([])

  const searchStr = 'mockup'

  const fetchResult = () => {
    //TODO fetch search result
    setData(data1)
    setLoading(false)
  }
  useEffect(() => {
    fetchResult()
  }, [])
  return (
    <Layout hasSider={false} style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <MainHeader />
      <Content style={{ margin: '6rem 20% 0 20%' }}>
        <Text style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Search results : </Text>
        <Text style={{ fontSize: '1.5rem', fontWeight: 'normal' }}>{searchStr}</Text>

        <div style={{ margin: '2.5rem 5% 3rem 5%' }}>
          <List
            grid={{ gutter: 100, column: 2 }}
            loading={loading}
            dataSource={data}
            renderItem={(item: IFriend) => (
              <List.Item>
                <UserListItem id={item.id} name={item.name} />
              </List.Item>
            )}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Text style={{ fontSize: '1.25rem', fontWeight: 'normal', color: '#BDBDBD' }}>End of results</Text>
        </div>
      </Content>
      <Footer />
    </Layout>
  )
}
export default SearchResult
