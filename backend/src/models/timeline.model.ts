import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { IPost } from '../types/post'

const TimelineSchema: Schema = new Schema({
  posts: { type: [Schema.Types.ObjectId] },
})

export const Timeline = mongoose.model<IPost>('Post', TimelineSchema)
