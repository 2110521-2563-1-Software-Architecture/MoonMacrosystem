import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { IPost, IComment } from '../types/post'

const PostSchema: Schema = new Schema({
  owner: { type: Schema.Types.ObjectId, required: true },
  created: { type: Date, default: Date.now },
  likes: { type: [Schema.Types.ObjectId] },
  comments: { type: [Schema.Types.ObjectId] },
  message: { type: String, default: '' },
  picture: { type: [String] },
  videos: { type: [String] },
})

const CommentSchema: Schema = new Schema({
  owner: { type: Schema.Types.ObjectId, required: true },
  message: { type: String, required: true },
  created: { type: Date, default: Date.now },
})

export const Post = mongoose.model<IPost>('Post', PostSchema)
export const Comment = mongoose.model<IComment>('UserFollow', CommentSchema)
