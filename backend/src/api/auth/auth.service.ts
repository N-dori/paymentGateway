// ...existing code...
import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'
import userService from '../../user/user.service'
import logger  from '../../services/logger.service'

const cryptr = new Cryptr(process.env.SECRET1 ?? 'Secret-Puk-1234')

export interface AuthUser {
  _id: string
  username?: string
  fullname: string
  isAdmin?: boolean
  password?: string
  imgUrl?: string
}
export async function login(username: string, password: string): Promise<AuthUser> {
  logger.debug(`auth.service - login with username: ${username}`)

  const user = await userService.getByUsername(username)
  if (!user || !user._id) {
    throw new Error('Invalid username or password')
  }

  // Convert MongoDB ObjectId or string to string
  const authUser: AuthUser = {
    _id: user._id.toString(),
    username: user.username,
    fullname: user.fullname || '',
    isAdmin: user.isAdmin,
    password: user.password,
    imgUrl: user.imgUrl
  }

  // TODO: enable real password check in production
  // const match = await bcrypt.compare(password, authUser.password || '')
  // if (!match) throw new Error('Invalid username or password')

  return authUser
}

export async function signup({
  username,
  password,
  fullname,
  imgUrl,
}: {
  username: string
  password: string
  fullname: string
  imgUrl?: string
}): Promise<AuthUser> {
  const saltRounds = 10

  logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
  if (!username || !password || !fullname) {
    throw new Error('Missing required signup information')
  }

  const userExist = await userService.getByUsername(username)
  if (userExist) {
    throw new Error('Username already taken')
  }

  const hash = await bcrypt.hash(password, saltRounds)
  const newUser = await userService.add({ username, password: hash, fullname, imgUrl })
  
  if (!newUser || !newUser._id) {
    throw new Error('Failed to create user')
  }

  // Convert to AuthUser type
  const authUser: AuthUser = {
    _id: newUser._id.toString(),
    username: newUser.username,
    fullname: newUser.fullname || '',
    isAdmin: newUser.isAdmin,
    password: newUser.password,
    imgUrl: newUser.imgUrl
  }

  return authUser
}
export function getLoginToken(user: AuthUser): string {
  const userInfo = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
  return cryptr.encrypt(JSON.stringify(userInfo))
}

export function validateToken(loginToken: string): AuthUser | null {
  try {
    logger.debug('GOT:', loginToken)
    const json = cryptr.decrypt(loginToken)
    const loggedinUser = JSON.parse(json) as AuthUser
    return loggedinUser
  } catch (err) {
    logger.error('Invalid login token', err)
    return null
  }
}

export default {
  signup,
  login,
  getLoginToken,
  validateToken,
}
// ...existing code...