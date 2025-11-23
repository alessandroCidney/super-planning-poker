export interface SocketResponse<T = unknown> {
  status: number
  error: boolean
  message?: string
  details?: string
  data: T
}
