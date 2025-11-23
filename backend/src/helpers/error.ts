import { SocketCallback } from '../types/socket'

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

export function websocketErrorHandlerWrapper<PayloadType, CallbackType extends SocketCallback>(baseHandler: (payload: PayloadType, callback: CallbackType) => void) {
  function handlerWithErrorHandling(payload: PayloadType, callback: CallbackType) {
    try {
      baseHandler(payload, callback)
    } catch (err) { 
      if (err instanceof AppError) {
        callback({
          error: true,
          status: err.status,
          message: err.message,
          details: err.details,
          data: null,
        })
      } else {
        callback({
          error: true,
          status: 500,
          message: 'Ocorreu um erro interno!',
          details: 'Por favor, tente novamente mais tarde.',
          data: null,
        })
      }
    }
  }
  
  return handlerWithErrorHandling
}