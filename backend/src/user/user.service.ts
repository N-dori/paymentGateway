import { Collection, ObjectId} from 'mongodb'
import dbService from '../services/db.service'
import  logger  from '../services/logger.service'

export interface User {
  _id?: ObjectId
  username?: string
  password?: string
  fullname?: string
  imgUrl?: string
  score?: number
  likedByUsers?: any
  createdAt?: number
  givenReviews?: any[]
  [key: string]: any
}

interface FilterBy {
  txt?: string
  minBalance?: number
  [key: string]: any
}

async function getCollection(): Promise<Collection<User>> {
  return dbService.getCollection<User>('user')
}

export async function query(filterBy: FilterBy = {}): Promise<User[]> {
  const criteria = _buildCriteria(filterBy)
  try {
    const collection = await getCollection()
    let users = await collection.find(criteria).toArray()
    // users = users.map((user: any) => {
    //   if (user.password) delete user.password
    //   // convert _id to string for frontend convenience and set createdAt timestamp
    //   user._id = user._id?.toString?.() ?? user._id
    //   user.createdAt = ObjectId(user._id).getTimestamp().getTime()
    //   return user as User
    // })
    return users
  } catch (err) {
    logger.error('cannot find users', err)
    throw err
  }
}

export async function getById(userId: string): Promise<User | null> {
  try {
    const collection = await getCollection()
    const user = await collection.findOne({ _id: new ObjectId(userId) })
    if (!user) return null
    if (user.password) delete user.password

    // user.givenReviews = await reviewService.query({ byUserId: new ObjectId(user._id) })
    return user as User
  } catch (err) {
    logger.error(`while finding user by id: ${userId}`, err)
    throw err
  }
}

export async function getByUsername(username: string): Promise<User | null> {
  try {
    const collection = await getCollection()
    const user = await collection.findOne({ username })
    return (user as User) ?? null
  } catch (err) {
    logger.error(`while finding user by username: ${username}`, err)
    throw err
  }
}

export async function remove(userId: string): Promise<void> {
  try {
    const collection = await getCollection()
    await collection.deleteOne({ _id: new ObjectId(userId) })
  } catch (err) {
    logger.error(`cannot remove user ${userId}`, err)
    throw err
  }
}

export async function update(user: Partial<User> & { _id: string }): Promise<User> {
  try {
    const userToSave = {
      _id: new ObjectId(user._id),
      fullname: user.fullname,
      likedByUsers: user.likedByUsers,
    }
    const collection = await getCollection()
    await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
    // return with string id for consistency
    return { ...userToSave, _id: userToSave._id.toString() } as unknown as User
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err)
    throw err
  }
}

export async function add(user: {
  username: string
  password: string
  fullname: string
  imgUrl?: string
}): Promise<User> {
  try {
    const userToAdd = {
      username: user.username,
      password: user.password,
      fullname: user.fullname,
      imgUrl: user.imgUrl,
      score: 100,
    }
    const collection = await getCollection()
    const result = await collection.insertOne(userToAdd)
    
    // Create a proper User object with ObjectId
    const inserted: User = {
      ...userToAdd,
      _id: result.insertedId, // MongoDB returns ObjectId directly
    }
    
    return inserted
  } catch (err) {
    logger.error('cannot add user', err)
    throw err
  }
}

function _buildCriteria(filterBy: FilterBy): Record<string, any> {
  const criteria: Record<string, any> = {}
  if (filterBy.txt) {
    const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
    criteria.$or = [{ username: txtCriteria }, { fullname: txtCriteria }]
  }
  if (filterBy.minBalance !== undefined) {
    criteria.score = { $gte: filterBy.minBalance }
  }
  return criteria
}

export default {
  query,
  getById,
  getByUsername,
  remove,
  update,
  add,
}