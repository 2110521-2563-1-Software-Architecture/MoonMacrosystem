import * as express from 'express'
import { Request, Response } from 'express'
import { IRequest } from './types/types'
import { login, register } from './api/user'
require('dotenv').config()

const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const { PORT = 5420 } = process.env

const mongoose = require('mongoose')
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
console.log(connectionString)
mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to DB!')
  })
  .catch((err) => {
    console.log(err)
  })

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'hello',
  })
})

app.post('/login', (req: IRequest<{ username: string; password: string }>, res: Response) => {
  login(req, res).catch((err) => {
    console.log('Error Login')
    console.log(err)
    return
  })
})

app.post('/register', (req: IRequest<{ username: string; password: string; displayName: string }>, res: Response) => {
  register(req, res).catch((err) => {
    console.log('Error Register')
    console.log(err)
    return
  })
})

app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT)
})
