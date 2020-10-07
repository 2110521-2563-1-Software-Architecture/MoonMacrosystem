import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'https://example/api',
  headers: { 'X-Custom-Header': 'foobar' },
})

const signInApi = (payload: any) => {
  // api
  //   .post('/user', payload)
  //   .then((response: AxiosResponse) => {
  //     console.log(response)
  //   })
  //   .catch((error: AxiosError) => {
  //     console.log(error)
  //   })
  return payload.username == 'username' && payload.password == 'password'
}

export default signInApi
