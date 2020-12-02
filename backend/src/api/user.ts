import * as crypto from 'crypto'
import { UserSecret, User, UserFollow } from '../models/user.model'
import { IRequest } from '../types/types'
import { Response } from 'express'

async function hashPassword(password) {
  return new Promise<{ salt: string; hash: string }>((resolve, reject) => {
    // generate random 16 bytes long salt
    const salt = crypto.randomBytes(16).toString('hex')

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve({ salt, hash: derivedKey.toString('hex') })
    })
  })
}

async function verify(password, hash, salt) {
  return new Promise<boolean>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(hash == derivedKey.toString('hex'))
    })
  })
}

export async function register(
  req: IRequest<{ username: string; password: string; displayName: string }>,
  res: Response
) {
  const { username, password, displayName } = req.body
  const { salt, hash } = await hashPassword(password)
  const userSecret = new UserSecret({ username, hash, salt })
  const user = new User({ username, displayName })
  try {
    await userSecret.save()
  } catch (err) {
    console.log('userSecret Error', err)
    return res.send({ status: 400, body: { err, message: err.message } })
  }
  try {
    const product = await user.save()
    return res.send({ status: 200, body: { message: 'User has been created', username: product.username } })
  } catch (err) {
    console.log('user Error', err)
    return res.send({ status: 400, body: { err, message: err.message } })
  }
}

export async function login(req: IRequest<{ username: string; password: string }>, res: Response) {
  console.log(req.body)
  const { username, password } = req.body
  UserSecret.findOne({ username: username }, async (err, result) => {
    console.log('error', err, result)
    if (err) {
      console.log(err)
      res.send({ status: 400, body: { message: 'Bad Request', err } })
      return
    } else {
      const { username, hash, salt } = result
      const valid = await verify(password, hash, salt)
      if (valid) {
        const user = User.findOne({ username: username })

        res.send({
          status: 200,
          body: { message: 'Login Successful!', username: (await user).displayName, userId: (await user)._id },
        })
        return
      } else {
        res.send({ status: 400, body: { message: 'Login Failed! Password is invalid', username: username } })
        return
      }
    }
  })
}

export async function follow(req, res) {
  const { userId, targetId } = req.body
  console.log('xxxxx')
  UserFollow.findOne({ username: userId }, async (err, result) => {
    console.log(result)
    if (result == null) {
      await new UserFollow({ username: userId, followers: [userId], followings: [userId, targetId] }).save()
      console.log('yyyyy')
    } else {
      result.followings.push(targetId)
      result.save()
    }
  })

  UserFollow.findOne({ username: targetId }, async (err, result) => {
    if (result == null) {
      await new UserFollow({ username: targetId, followers: [userId, targetId], followings: [targetId] }).save()
      console.log('zzzz')
    } else {
      result.followers.push(userId)
      result.save()
    }
  })
  res.send({ status: 200, body: { message: 'Followwwwwwww' } })
  return
}

export async function unfollow(req, res) {
  const { userId, targetId } = req.body
  console.log('xxxxx')
  const user = await UserFollow.findOne({ username: userId })
  user.followings

  UserFollow.findOne({ username: userId }, async (err, result) => {
    console.log(result)
    const index = result.followings.indexOf(targetId)
    console.log(index)
    if (index > -1) {
      result.followings.splice(index, 1)
    }
    console.log(result.followings)
    await result.save()
  })

  UserFollow.findOne({ username: targetId }, async (err, result) => {
    console.log(result)
    const index = result.followers.indexOf(userId)
    console.log(index)
    if (index > -1) {
      result.followers.splice(index, 1)
    }
    console.log(result.followers)
    await result.save()
  })

  res.send({ status: 200, body: { message: 'UnFollowwwwwwww' } })
}
