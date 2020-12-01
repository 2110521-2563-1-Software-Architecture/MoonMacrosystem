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

  console.log(out)

  return res.send({ status: 200, body: out })
}

export async function getFollowings(userId) {
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

export async function getNewFeed(req, res) {
  const { userId, limit, offset } = req.body
  const followings = await getFollowings(userId)

  console.log('xxxxx')
  const result = await Post.find({ owner: { $in: followings } })
    .skip(offset)
    .limit(limit)
  console.log(result)
  console.log('yyyyy')

  return res.send({ status: 200, body: { tweets: result } })
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

  return res.send({ status: 200, body: { comments: comments } })
}
