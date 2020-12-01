import * as crypto from 'crypto'
import { Post, Comment } from '../models/post.model'
import { User, UserFollow, UserPosts } from '../models/user.model'
import { IRequest } from '../types/types'
import { Response } from 'express'

export async function addTweet(req, res) {
  const { userId, message, picture, video } = req.body
  const created = Date.now
  const likes = []
  const comments = []

  const tweet = await new Post({ owner: userId, likes, comments, message, picture, videos: video }).save()
  console.log(tweet.owner)

  // return res.send({ status: 200, body: { message: 'ggg '});
  UserPosts.findOne({ username: tweet.owner }, async (err, result) => {
    // console.log('error', err, result.length)
    console.log(result)

    if (result != null) {
      console.log('found')
      result.posts.push(tweet._id)
      await result.save()
      console.log(result.posts)
      res.send({ status: 200, body: { message: 'Found', err } })
      return
    } else {
      console.log('not found')
      await new UserPosts({ username: tweet.owner, posts: [tweet._id] }).save()

      res.send({ status: 200, body: { message: 'Not found', username: tweet.owner } })
      return
    }
  })
  return res.send({ status: 200, body: { message: 'done' } })
}

export async function deleteTweet(req, res) {
  const { userId, tweetId } = req.body
  Post.deleteOne({ _id: tweetId })

  UserPosts.findOne({ username: userId }, async (err, result) => {
    const index = result.posts.indexOf(tweetId)
    if (index > -1) {
      result.posts.splice(index, 1)
    }
    console.log(result.posts)
    await result.save()
  })
  return res.send({ status: 200, body: { message: 'done' } })
}

export async function getTweet(req, res) {
  const { userId } = req.body

  UserPosts.findOne({ username: userId }, async (err, result) => {
    console.log(result.posts)
    res.send({ status: 200, body: { posts: result.posts } })
  })
}

export async function addComment(req, res) {
  const { userId, message, tweetId } = req.body
  //
  const comment = await new Comment({ owner: userId, message }).save()

  const id = (
    await Post.findOne({ _id: tweetId }, async (err, result) => {
      console.log(result)
      result.comments.push(comment._id)
      result.save()
    })
  )._id
  res.send({ status: 200, body: { id } })
}
export async function deleteComment(req, res) {
  const { userId, commentId, tweetId } = req.body
  //

  Comment.deleteOne({ _id: commentId })

  Post.findOne({ _id: tweetId }, async (err, result) => {
    console.log(result)
    const index = result.comments.indexOf(commentId)
    console.log(index)
    if (index > -1) {
      result.comments.splice(index, 1)
    }
    console.log(result.comments)
    await result.save()
  })
  return res.send({ status: 200, body: { message: 'done' } })
}

export async function likeTweet(req, res) {
  const { userId, tweetId } = req.body
  //
  Post.findOne({ _id: tweetId }, async (err, result) => {
    console.log(result)
    result.likes.push(userId)
    result.save()
  })
  return res.send({ status: 200, body: { message: 'done' } })
}

export async function unlikeTweet(req, res) {
  const { userId, tweetId } = req.body
  //
  Post.findOne({ _id: tweetId }, async (err, result) => {
    console.log(result)

    const index = result.likes.indexOf(userId)
    console.log(index)
    if (index > -1) {
      result.likes.splice(index, 1)
    }
    console.log(result.likes)
    await result.save()
  })
  return res.send({ status: 200, body: { message: 'done' } })
}

export async function getNewFeed(req, res) {
  const { userId } = req.body
  const followings = await (await UserFollow.findOne({ username: userId })).followings

  console.log(followings)

  const test = Post.find().sort({ _id: 1 }).limit(10)
  console.log(test)
  const tweets = []

  for (let i = 0; i < followings.length; i++) {
    console.log(test[i])
  }
  res.send({ status: 200, body: { message: 'found' } })
  return
}
