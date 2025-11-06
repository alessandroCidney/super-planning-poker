import { useState } from 'react'

export function Home() {
  const [socket, setSocket] = useState<WebSocket>()

  const [messages, setMessages] = useState<string[]>([])
  
  function startConnection() {
    const ws = new WebSocket('ws://localhost:8080/test')

    ws.addEventListener('open', (event) => {
      console.log('connection open', event)
    })

    ws.addEventListener('message', (event) => {
      setMessages([
        ...messages,
        event.data,
      ])
    })

    setSocket(ws)
  }

  function RenderWebSocketStatus() {
    if (socket) {
      if (socket.readyState === WebSocket.OPEN) {
        return (
          <span>
            OPEN
          </span>
        )
      }

      if (socket.readyState === WebSocket.CLOSED) {
        return (
          <span>
            CLOSED
          </span>
        )
      }
    }
  }
  
  return (
    <div>
      <div>
        <button onClick={startConnection}>
          Iniciar conexão
        </button>
      </div>

      <div>
        Status: <RenderWebSocketStatus />
      </div>

      <div>
        <div>
          Mensagens
        </div>

        <div>
          {
            messages.map((messageStr, messageStrIndex) => (
              <div key={messageStrIndex}>
                { messageStr }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}