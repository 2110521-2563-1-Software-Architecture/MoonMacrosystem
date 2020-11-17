require('dotenv').config()

import * as aws from 'aws-sdk'
import { Request } from 'express'
import * as multer from 'multer'
import * as multerS3 from 'multer-s3'

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'video/mp4' ||
    file.mimetype === 'video/avi' ||
    file.mimetype === 'video/mov' ||
    file.mimetype === 'video/quicktime'
  ) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type'), false)
  }
}

export const uploadMiddleware = multer({
  fileFilter,
  storage: multerS3({
    s3: new aws.S3({
      accessKeyId: process.env.DO_SPACES_KEY || null,
      secretAccessKey: process.env.DO_SPACES_SECRET || null,
      endpoint: process.env.DO_SPACES_ENDPOINT || null,
      signatureVersion: 'v4',
    }),
    bucket: process.env.DO_SPACES_BUCKET || null,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req: Request, file, cb): any => {
      // save file to Spaces, you can use / to add folders directory
      cb(null, `moonmacrosystem/${Date.now().toString()}-${file.originalname}`)
    },
  }),
}).array('upload', 1)
