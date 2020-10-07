import { Url } from './types'
import { Document } from 'mongoose'
import { IUser } from '../types/user'

export interface IPost extends Document {
  owner: IUser['_id']
  created: Date
  likes: IUser['_id'][]
  comments: IComment['_id'][]
  message: string
  picture: Url[]
  videos: Url[]
}

export interface IComment extends Document {
  owner: IUser['_id']
  message: string
  created: Date
}
