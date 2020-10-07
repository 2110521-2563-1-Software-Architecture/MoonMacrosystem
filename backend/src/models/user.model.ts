import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { IUserSecret, IUser, IUserFollow, IUserPosts } from '../types/user'

const UserSecretSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
})

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
})

const UserFollowSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  followers: { type: [Schema.Types.ObjectId] },
  followings: { type: [Schema.Types.ObjectId] },
})

const UserPostsSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  posts: { type: [Schema.Types.ObjectId] },
})

export const UserSecret = mongoose.model<IUserSecret>('UserSecret', UserSecretSchema)
export const User = mongoose.model<IUser>('User', UserSchema)
export const UserFollow = mongoose.model<IUserFollow>('UserFollow', UserFollowSchema)
export const UserPosts = mongoose.model<IUserPosts>('UserPosts', UserPostsSchema)
