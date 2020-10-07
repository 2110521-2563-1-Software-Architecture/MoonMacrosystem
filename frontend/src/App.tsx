import React from 'react'
import 'antd/dist/antd.less'
import Login from './pages'
import Register from './pages/register'
import Timeline from './pages/timeline'

export default function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Register />
      {/* <Login /> */}
      {/* <Timeline /> */}
    </div>
  )
}
