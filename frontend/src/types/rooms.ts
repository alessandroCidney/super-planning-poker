import type { Story } from './stories'
import type { User } from './users'

export interface Room {
  _id: string

  users: Record<string, User>
  stories: Record<string, Story>

  ownerIds: string[]
}