import { Router } from 'express'
import expressWs from 'express-ws'

const router = Router()
expressWs(router)

var receivers = []
router.ws('/alert', function (ws, req) {
  const idx = receivers.push(ws) - 1
  ws.on('message', msg => {
    receivers.forEach((receiver, receiverId) => {
      if (receiverId !== idx) { receiver.send(msg) }
    })
  })
  ws.on('close', () => {
    receivers = receivers.filter(v => v !== ws)
  })
})

export default router
