import { Document } from 'mongoose'
import { IPost } from './post'

export interface IUserSecret extends Document {
  username: string
  hash: string
  salt: string
}

export interface IUser extends Document {
  username: string
  displayName: string
}

export interface IUserFollow extends Document {
  username: IUser['_id']
  followers: IUser['_id'][]
  followings: IUser['_id'][]
}

export interface IUserPosts extends Document {
  username: IUser['_id']
  posts: IPost['_id'][]
}
