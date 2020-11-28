import * as crypto from 'crypto'
import { Post, Comment } from '../models/post.model'
import { User, UserFollow, UserPosts } from '../models/user.model'
import { IRequest } from '../types/types'
import { Response } from 'express'

export async function addTweet(req, res) {
  const { owner, massage } = req.body
  const created = Date.now
  const likes = []
  const comments = []
  const picture = 'InProgress'
  const videos = 'InProgress'

  const tweet = await new Post({ owner, likes, comments, massage, picture, videos }).save()
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
}

export async function deleteTweet(req, res) {
  const { owner, tweetId } = req.body
  Post.deleteOne({ _id: tweetId }, function (err) {
    if (!err) {
      res.send({ status: 200, body: { message: 'found' } })
      return
    } else {
      res.send({ status: 200, body: { message: 'Not found' } })
      return
    }
  })

  UserPosts.findOne({ username: owner }, async (err, result) => {
    const index = result.posts.indexOf(tweetId)
    if (index > -1) {
      result.posts.splice(index, 1)
    }
    console.log(result.posts)
    await result.save()
  })
}

export async function getTweet(req, res) {
  const { owner } = req.body

  UserPosts.findOne({ username: owner }, async (err, result) => {
    console.log(result.posts)
    res.send({ status: 200, body: { posts: result.posts } })
  })
}

export async function addComment(req, res) {
  const { owner, message, postId } = req.body
  //
  const comment = await new Comment({ owner, message }).save()
  res.send({ status: 200, body: { message } })
  Post.findOne({ _id: postId }, async (err, result) => {
    console.log(result)
    result.comments.push(comment._id)
    result.save()
  })
}
export async function deleteComment(req, res) {
  const { owner, commentId, postId } = req.body
  //

  Comment.deleteOne({ _id: commentId }, function (err) {
    if (!err) {
      res.send({ status: 200, body: { message: 'found' } })
      return
    } else {
      res.send({ status: 200, body: { message: 'Not found' } })
      return
    }
  })

  Post.findOne({ _id: postId }, async (err, result) => {
    console.log(result)
    const index = result.comments.indexOf(commentId)
    console.log(index)
    if (index > -1) {
      result.comments.splice(index, 1)
    }
    console.log(result.comments)
    await result.save()
  })
}

export async function likeTweet(req, res) {
  const { owner, postId } = req.body
  //
  Post.findOne({ _id: postId }, async (err, result) => {
    console.log(result)
    result.likes.push(owner)
    result.save()
  })
}
