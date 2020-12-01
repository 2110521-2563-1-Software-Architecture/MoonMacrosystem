import axios, { AxiosInstance } from 'axios'

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
  fetchTimeline: (payload: { userId: string; limit: number; offset: number }, callback: any, onRejected: any) => {
    api
      .post('/getNewFeed', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
  fetchComment: (payload: { tweetId: string }, callback: any, onRejected: any) => {
    api
      .post('/getComments', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
  addPost: (
    payload: { userId: string; message: string; picture: string; video: string },
    callback: any,
    onRejected: any
  ) => {
    console.log('add post', payload)
    api
      .post('/addTweet', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
  deletePost: (payload: { userId: string; tweetId: string }, callback: any, onRejected: any) => {
    api
      .post('/deleteTweet', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
  addComment: (payload: { userId: string; tweetId: string; message: string }, callback: any, onRejected: any) => {
    api
      .post('/addComment', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
  deleteComment: (payload: { userId: string; tweetId: string; commentId: string }, callback: any, onRejected: any) => {
    api
      .post('/deleteComment', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
  updateLike: (payload: { userId: string; tweetId: string }, callback: any, onRejected: any) => {
    api
      .post('/likeTweet', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
  updateUnlike: (payload: { userId: string; tweetId: string }, callback: any, onRejected: any) => {
    api
      .post('/unlikeTweet', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
  upload: (payload: FormData, callback: any, onRejected: any) => {
    api
      .post('/upload', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
}
export const friend = {
  getFollowings: (payload: { userId: string }, callback: any, onRejected: any) => {
    api
      .post('/getFollowings', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
  getFollowers: (payload: { userId: string }, callback: any, onRejected: any) => {
    api
      .post('/getFollowers', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
  updateFollow: (payload: { userId: string; targetId: string }, callback: any, onRejected: any) => {
    api
      .post('/follow', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
  updateUnfollow: (payload: { userId: string; targetId: string }, callback: any, onRejected: any) => {
    api
      .post('/unfollow', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
  search: (payload: { username: string }, callback: any, onRejected: any) => {
    api
      .post('/search', payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response))
  },
}
