import { Router } from 'express'
import expressWs from 'express-ws'

const router = Router()
expressWs(router)

router.ws('/move',function(ws,req){
  ws.on('message', function(msg) {
    console.log('from server: ' + msg)
    ws.send(msg)
  })
})

export default router
