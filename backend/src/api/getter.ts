import * as crypto from 'crypto'
import { Post, Comment } from '../models/post.model'
import { User, UserFollow, UserPosts } from '../models/user.model'
import { IRequest } from '../types/types'
import { Response } from 'express'
const mongoose = require('mongoose')

export async function getFollowers(req, res) {
  const { userId } = req.body
  const user = await UserFollow.findOne({ username: userId })
  console.log(user)
  const followers = new Set()
  const followersOb = new Set()
  let out
  out = []

  if (user != null) {
    console.log('xxxx')
    for (const c of user.followers) {
      followers.add(String(c))
    }
    for (const c of Array.from(followers)) {
      followersOb.add(mongoose.Types.ObjectId(c))
    }
    out = Array.from(followersOb)
  }
  const users = []

  for (const v of out) {
    console.log(v)
    const u = await User.findOne({ _id: v })
    users.push(u)
  }

  return res.send({ status: 200, body: { followers: out, users: users } })

  console.log(out)

  return res.send({ status: 200, body: out })
}

export async function getFollowingsZero(userId) {
  const user = await UserFollow.findOne({ username: userId })
  console.log(user)
  const followings = new Set()
  const followingsOb = new Set()
  let out
  out = []

  if (user != null) {
    for (const c of user.followings) {
      followings.add(String(c))
    }
    for (const c of Array.from(followings)) {
      followingsOb.add(mongoose.Types.ObjectId(c))
    }
    out = Array.from(followingsOb)
  }

  console.log(out)

  return out
}

export async function getFollowings(req, res) {
  const { userId } = req.body
  const user = await UserFollow.findOne({ username: userId })
  console.log(user)
  const followings = new Set()
  const followingsOb = new Set()
  let out
  out = []

  if (user != null) {
    console.log('xxxx')
    for (const c of user.followers) {
      followings.add(String(c))
    }
    for (const c of Array.from(followings)) {
      followingsOb.add(mongoose.Types.ObjectId(c))
    }
    out = Array.from(followingsOb)
  }
  const users = []

  for (const v of out) {
    console.log(v)
    const u = await User.findOne({ _id: v })
    users.push(u)
  }

  return res.send({ status: 200, body: { followrings: out, users: users } })

  console.log(out)

  return res.send({ status: 200, body: out })
}

export async function getNewFeed(req, res) {
  const { userId, limit, offset } = req.body
  const followings = await getFollowingsZero(userId)

  console.log('xxxxx')
  const result = await Post.find({ owner: { $in: followings } })
    .skip(offset)
    .limit(limit)
  console.log(result)
  console.log('yyyyy')
  const users = []
  for (const v of result) {
    console.log(v)
    const user = await User.findOne({ _id: v.owner })
    users.push(user)
  }

  return res.send({ status: 200, body: { tweets: result, users: users } })
}

export async function getComments(req, res) {
  const { tweetId } = req.body
  const commentsId = await Post.findOne({ _id: tweetId })
  let ggg
  ggg = []

  if (commentsId) {
    ggg = commentsId.comments
  }
  console.log(ggg)

  const comments = await Comment.find({ _id: { $in: ggg } })
  const users = []

  for (const v of comments) {
    console.log(v.owner)
    const u = await User.findOne({ _id: v.owner })
    users.push(u)
  }
  return res.send({ status: 200, body: { comments: comments, users: users } })
}

export async function search(req, res) {
  const { username } = req.body
  const result = await User.find({ username: { $regex: username, $options: 'i' } })
  return res.send({ status: 200, body: { result } })
}
