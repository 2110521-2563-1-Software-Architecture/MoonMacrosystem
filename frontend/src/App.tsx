import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.less'
import PrivateRoute from './component/privateroute'
import Login from './pages'
import Register from './pages/register'
import Timeline from './pages/timeline'
import SearchResult from './pages/searchresult'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/home" component={Timeline} />
        <PrivateRoute path="/result" component={SearchResult} />
      </Switch>
    </BrowserRouter>
  )
}
