import type { Story } from './stories.interface'
import type { User } from './users.interface'

export interface Room {
  _id: string

  users: Record<string, User>
  stories: Story[]

  ownerIds: string[]
}