import * as crypto from 'crypto'
import { UserSecret, User } from '../models/user.model'
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
  await userSecret.save((err) => {
    if (err) {
      console.log(err)
      res.send({ status: 400, body: { message: 'Bad Request, cannot save UserSecret', err } })
    }
  })
  await user.save((err, product) => {
    if (err) {
      console.log(err)
      res.send({ status: 400, body: { message: 'Bad Request, cannot save User', err } })
    } else {
      res.send({ status: 200, body: { message: 'User has been created', username: product.username } })
    }
  })
}

export async function login(req: IRequest<{ username: string; password: string }>, res: Response) {
  console.log(req.body)
  const { username, password } = req.body
  UserSecret.find({ username: username }, async (err, result) => {
    console.log('error', err, result)
    if (err) {
      console.log(err)
      res.send({ status: 400, body: { message: 'Bad Request', err } })
    } else {
      const { username, hash, salt } = result[0]
      const valid = await verify(password, hash, salt)
      if (valid) {
        res.send({ status: 200, body: { message: 'Login Successful!', username: username } })
      } else {
        res.send({ status: 400, body: { message: 'Login Failed! Password is invalid', username: username } })
      }
    }
  })
}
