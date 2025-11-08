import { AsyncLocalStorage } from 'async_hooks';

export interface LoggedInUser {
  _id?: string;
  [key: string]: any;
}

export interface Store {
  loggedinUser?: LoggedInUser;
}

// AsyncLocalStorage singleton used to store request-scoped data (e.g. loggedinUser)
export const asyncLocalStorage = new AsyncLocalStorage<Store>();