import { Request } from 'express'

export type Id = string
export type UserId = string
export type PostId = string
export type CommentId = string
export type Url = string

export interface IRequest<T> extends Request {
  body: T
}
