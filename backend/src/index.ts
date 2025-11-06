import express from "express"
import expressWs from 'express-ws'
import { v4 as uuidV4 } from 'uuid'
import 'dotenv/config'

const expressApp = express()

const { app } = expressWs(expressApp)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'OK',
  })
})

app.ws('/test', (ws, req) => {

const fakeDatabase: string[] = []
  function simulateDatabaseRemove(id: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const itemIndex = fakeDatabase.findIndex(itemStr => itemStr === id)

        fakeDatabase.splice(itemIndex, 1)
      }, 3000)
    })
  }

  const newUuid = uuidV4()

  fakeDatabase.push(newUuid)

  console.log('new user', newUuid)
  console.log('fake', fakeDatabase)

  ws.send(newUuid)

  ws.on('message', (data) => {
    console.log('message', data)
  })

  ws.on('close', async () => {
    await simulateDatabaseRemove(newUuid)

    console.log('closed')
  })

  ws.on('error', (err) => {
    console.error('error', err)
  })

  console.log('ws started')
})

app.listen(process.env.PORT, () => {
  console.log(`Listening at port ${process.env.PORT}`)
})