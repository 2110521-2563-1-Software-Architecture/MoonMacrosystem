import axios, { AxiosInstance } from 'axios'
import moment from 'moment'

const api: AxiosInstance = axios.create({
  baseURL: 'https://mm-backend.icekang.com',
  headers: { 'Content-Type': 'application/json' },
})

export const authentication = {
  login: (payload: { username: string; password: string }, callback: any, onRejected: any) => {
    api
      .post('/login', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
  register: (payload: { username: string; password: string; displayName: string }, callback: any, onRejected: any) => {
    api
      .post('/register', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
}
export const timeline = {
  fetchTimeline: (payload: { username: string }, callback: any, onRejected: any) => {
    callback({
      data: [
        {
          owner: 'ploy',
          message: 'สวัสดี',
          picture: [
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          ],
          created: moment(),
        },
        { owner: 'ploy1234', message: 'hello', picture: [], created: moment() },
        {
          owner: 'ployyyyyyyyyy',
          message: 'สวัสดี1234566',
          picture: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
          created: moment(),
        },
      ],
    })
  },
  fetchComment: (payload: { postid: string }, callback: any, onRejected: any) => {
    callback({
      data: [
        {
          owner: 'ploy',
          message: 'สวัสดีจ้าาาาา',
          created: moment(),
        },
        { owner: 'ploy1234', message: '!!!!!!', created: moment() },
      ],
    })
  },
  addPost: (payload: { owner: string; message: string }, callback: any, onRejected: any) => {
    console.log('add post', payload)
    callback({
      data: {},
    })
  },
  addComment: (payload: { owner: string; message: string }, callback: any, onRejected: any) => {
    console.log('add comment', payload)
    callback({
      data: {},
    })
  },
}
export const friend = {
  fetchFollow: (payload: { username: string }, callback: any, onRejected: any) => {
    callback({
      data: {
        followings: [
          { id: '123456', username: 'ploy' },
          { id: '123777', username: 'pinn' },
          { id: '123346', username: 'namkang' },
        ],
        followers: [
          { id: '123346', username: 'namkang' },
          { id: '123766', username: 'velody' },
        ],
      },
    })
  },
  updateFollow: (payload: { owner: string; username: string }, callback: any, onRejected: any) => {
    console.log('unfollow called')
    callback({
      data: {},
    })
  },
  updateUnfollow: (payload: { owner: string; username: string }, callback: any, onRejected: any) => {
    console.log('follow called')
    callback({
      data: {},
    })
  },
  search: (payload: { searchstr: string }, callback: any, onRejected: any) => {
    callback({
      data: [
        { id: '123456', username: 'ploy' },
        { id: '123777', username: 'pinn' },
        { id: '123346', username: 'namkang' },
        { id: '123766', username: 'velody' },
        { id: '155766', username: 'test1234' },
      ],
    })
  },
}
