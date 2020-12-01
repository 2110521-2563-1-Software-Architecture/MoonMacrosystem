import * as crypto from 'crypto'
import { Post, Comment } from '../models/post.model'
import { User, UserFollow, UserPosts } from '../models/user.model'
import { IRequest } from '../types/types'
import { Response } from 'express'
const mongoose = require('mongoose')

export async function getFollowings(userId) {
  const user = await UserFollow.findOne({ username: userId })
  const followings = new Set()
  const followingsOb = new Set()
  let out
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
  const { userId } = req.body
  const followings = getFollowings(userId)
}
