import { v4 as uuidV4 } from 'uuid'

import { Story } from './Story'
import { User } from './User'

export class Room {
  _id: string

  users: Record<string, User>
  stories: Story[]

  ownerIds: string[]

  constructor(users = {} as Record<string, User>, stories = [] as Story[], _id = uuidV4()) {
    this._id = _id
    this.users = users
    this.stories = stories

    this.ownerIds = Object.keys(users)
  }
}