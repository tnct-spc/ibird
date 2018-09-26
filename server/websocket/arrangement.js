import { Router } from 'express'
import expressWs from 'express-ws'

const router = Router()
expressWs(router)

var receivers = []
router.ws('/move', function (ws, req) {
  ws.on('message', msg => {
    receivers.forEach((receiver, receiverId) => {
      try {
        receiver.send(msg)
      } catch (e) {
        console.log(e)
        receivers.splice(receiverId, 1)
      }
    })
  })
  ws.on('close', () => {
    receivers = receivers.filter(v => v !== ws)
  })
})

export default router
