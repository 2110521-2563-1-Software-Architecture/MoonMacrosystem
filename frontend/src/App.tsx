import React from 'react'
import { DatePicker } from 'antd'
import banner from './assets/images/test.png'
import 'antd/dist/antd.css'

export default function App() {
  return (
    <div>
      Hello
      <img src={banner} width="24" alt="bannger" />
      <DatePicker />
    </div>
  )
}
