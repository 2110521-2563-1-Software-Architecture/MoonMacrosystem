export interface ILogin {
  username: string
  password: string
}
export interface IRegister {
  username: string
  password: string
  displayName: string
}
export interface IPost {
  _id: string
  owner: string
  message: string
  picture: string[]
  videos: string[]
  likes: string[]
  // comments: string[]
  created: string
}
