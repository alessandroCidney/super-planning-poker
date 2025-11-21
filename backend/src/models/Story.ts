import { v4 as uuidV4 } from 'uuid'

import { dateToUnixTimestamp } from '../helpers/date'

export class Story {
  _id: string
  title: string

  votingStatus: 'not_started' | 'in_progress' | 'concluded'
  votes: Record<string, number>

  createdAt: number

  constructor(title: string, _id = uuidV4()) {
    this._id = _id
    this.title = title

    this.votingStatus = 'not_started'
    this.votes = {}

    this.createdAt = dateToUnixTimestamp(new Date())
  }
}