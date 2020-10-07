import { IPost } from './post'

/**
 * This is view from mongoDB, not actually stored on the DB
 */
export interface ITimeline {
  posts: IPost['_id'][]
}
