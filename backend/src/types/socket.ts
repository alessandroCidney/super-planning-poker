interface SocketResponse<T = unknown> {
  status: number
  error: boolean
  message?: string
  data: T
}

export type SocketCallback<T = unknown> = (param: SocketResponse<T>) => void
