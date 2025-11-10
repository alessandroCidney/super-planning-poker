export interface Story {
  _id: string
  title: string
  description?: string

  votingStatus: 'not_started' | 'in_progress' | 'concluded'
  votes: Record<string, number>
}