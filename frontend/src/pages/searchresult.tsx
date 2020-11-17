import React, { useState, useEffect } from 'react'
import { Layout, List, Typography } from 'antd'
import MainHeader from '../component/mainheader'
import UserListItem from '../component/userlistitem'
import { friend } from '../services/api'
import { useLocation } from 'react-router-dom'

interface IFriend {
  id: string
  username: string
}

const { Content, Footer } = Layout
const { Text } = Typography

const SearchResult = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<IFriend[]>([])
  const [following, setFollowing] = useState([])
  const [follower, setFollower] = useState([])

  let search: any = useLocation().search
  const searchstr = search.substring(search.indexOf('=') + 1)

  const checkIsFollow = (val: string) => {
    for (var i = 0; i < following.length; i++) {
      if (following[i].username == val) {
        return true
      }
    }
    return false
  }
  const fetchFriends = () => {
    //TODO fetch friend
    var payload = { username: localStorage.USERNAME }
    friend.fetchFollow(
      payload,
      ({ data }: any) => {
        setFollower(data.followers)
        setFollowing(data.followings)
        setLoading(false)
      },
      (response: any) => {
        console.log(response)
      }
    )
  }
  const fetchResult = () => {
    //TODO fetch search result
    var payload = { searchstr: searchstr }
    friend.search(
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
  useEffect(() => {
    fetchFriends()
    fetchResult()
  }, [])
  return (
    <Layout hasSider={false} style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <MainHeader />
      <Content style={{ margin: '6rem 20% 0 20%' }}>
        <Text style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Search results : </Text>
        <Text style={{ fontSize: '1.5rem', fontWeight: 'normal' }}>{searchstr}</Text>

        <div style={{ margin: '2.5rem 5% 3rem 5%' }}>
          <List
            grid={{ gutter: 100, column: 2 }}
            loading={loading}
            dataSource={data}
            renderItem={(item: IFriend) => (
              <List.Item>
                {<UserListItem id={item.id} username={item.username} isfollow={checkIsFollow(item.username)} />}
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
