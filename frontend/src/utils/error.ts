interface AppErrorParams {
  message: string
  details: string
  status: number
}

export class AppError extends Error {
  status: number

  details: string

  constructor(params: AppErrorParams) {
    super(params.message)

    this.details = params.details
    this.status = params.status
  }
}
