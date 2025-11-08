import { Request, Response, NextFunction } from 'express'
import authService from '../api/auth/auth.service'
import { asyncLocalStorage, Store } from '../services/als.service'

/**
 * Middleware to set up AsyncLocalStorage per request and store loggedinUser (if any).
 */
export default function setupAsyncLocalStorage(req: Request, res: Response, next: NextFunction) {
  const store: Store = {}

  asyncLocalStorage.run(store, () => {
    try {
      // If there are no cookies, continue
      if (!req.cookies) return next()

      const token = (req.cookies as any).loginToken
      if (!token) return next()

      const loggedinUser = authService.validateToken(token)

      if (loggedinUser) {
        const alsStore = asyncLocalStorage.getStore()
        if (alsStore) {
          alsStore.loggedinUser = loggedinUser
        }
      }
    } catch (err) {
      // don't block the request on token/validation errors — just continue
      // you can log the error here if you have a logger
      // console.error('ALS middleware error', err)
    } finally {
      next()
    }
  })
}