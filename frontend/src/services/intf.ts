export interface loginPayload {
  username: string
  password: string
  remember: boolean
}
export interface registerPayload {
  displayname: string
  username: string
  password: string
}
export interface postIntf {
  name: string
  content: string
}
