import React from 'react'
import { Switch, Route, Link, useRouteMatch, useParams, BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.less'
import Login from './pages'
import Register from './pages/register'
import Timeline from './pages/timeline'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Timeline} />
      </Switch>
    </BrowserRouter>
  )
}
