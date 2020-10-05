import React from 'react'
import 'antd/dist/antd.less'
import Login from './pages'
import PostItem from './component/postitem'
import CommentItem from './component/commentitem'

export default function App() {
  return (
    <div>
      <Login />
      <PostItem name="ploy" content="hi" />
      <CommentItem name="ploy" content="hi" />
      <CommentItem name="ploy" content="hi" />
    </div>
  )
}
