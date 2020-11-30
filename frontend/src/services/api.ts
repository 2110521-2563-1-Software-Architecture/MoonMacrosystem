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
  fetchTimeline: (payload: { userId: string }, callback: any, onRejected: any) => {
    callback({
      data: [
        {
          id: '5f7e0144ae71765de09dda5d',
          owner: 'user',
          message: 'สวัสดี',
          picture: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          video: '',
          likes: ['123456', '123777'],
          created: moment(),
        },
        {
          id: '12345679',
          owner: 'ploy1234',
          message: 'hello',
          picture: '',
          video:
            'https://icekangspaces.fra1.digitaloceanspaces.com/moonmacrosystem/1606669224134-file_example_MP4_480_1_5MG.mp4',
          likes: ['123456', '123777', '123346'],
          created: moment(),
        },
        {
          id: '12345680',
          owner: 'ployyyyyyyyyy',
          message: 'สวัสดี1234566',
          picture: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          video: '',
          likes: [],
          created: moment(),
        },
      ],
    })
  },
  fetchComment: (payload: { tweetId: string }, callback: any, onRejected: any) => {
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
  addPost: (
    payload: { userId: string; message: string; picture: string; video: string },
    callback: any,
    onRejected: any
  ) => {
    console.log('add post', payload)
    callback({
      data: {},
    })
    // api
    //   .post('/addTweet', payload)
    //   .then(({ data }) => callback({ data }))
    //   .catch(({ response }) => onRejected(response))
  },
  deletePost: (payload: { userId: string; tweetId: string }, callback: any, onRejected: any) => {
    console.log('delete post', payload)
    callback({
      data: {},
    })
    // api
    //   .post('/deleteTweet', payload)
    //   .then(({ data }) => callback({ data }))
    //   .catch(({ response }) => onRejected(response))
  },
  addComment: (payload: { userId: string; postId: string; message: string }, callback: any, onRejected: any) => {
    console.log('add comment', payload)
    callback({
      data: {},
    })
    // api
    //   .post('/addComment', payload)
    //   .then(({ data }) => callback({ data }))
    //   .catch(({ response }) => onRejected(response))
  },
  updateLike: (payload: { userId: string; tweetId: string }, callback: any, onRejected: any) => {
    console.log('update like', payload)
    callback({
      data: {},
    })
    // api
    //   .post('/likeTweet', payload)
    //   .then(({ data }) => callback({ data }))
    //   .catch(({ response }) => onRejected(response))
  },
  updateUnlike: (payload: { userId: string; tweetId: string }, callback: any, onRejected: any) => {
    console.log('update unlike', payload)
    callback({
      data: {},
    })
    // api
    //   .post('/unlikeTweet', payload)
    //   .then(({ data }) => callback({ data }))
    //   .catch(({ response }) => onRejected(response))
  },
  upload: (payload: FormData, callback: any, onRejected: any) => {
    api
      .post('/upload', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
}
export const friend = {
  fetchFollow: (payload: { userId: string }, callback: any, onRejected: any) => {
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
  updateFollow: (payload: { userId: string; targetId: string }, callback: any, onRejected: any) => {
    console.log('unfollow', payload)
    callback({
      data: {},
    })
    // api
    //   .post('/follow', payload)
    //   .then(({ data }) => callback({ data }))
    //   .catch(({ response }) => onRejected(response))
  },
  updateUnfollow: (payload: { userId: string; targetId: string }, callback: any, onRejected: any) => {
    console.log('follow', payload)
    callback({
      data: {},
    })
    // api
    //   .post('/unfollow', payload)
    //   .then(({ data }) => callback({ data }))
    //   .catch(({ response }) => onRejected(response))
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
