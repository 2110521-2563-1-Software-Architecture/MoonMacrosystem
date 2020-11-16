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
  id: string
  owner: string
  message: string
  picture: string[]
  // video: string[]
  likes: string[]
  // comments: string[]
  created: string
}
