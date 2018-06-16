import { Router } from 'express'
import expressWs from 'express-ws'

const router = Router()
expressWs(router)

router.ws('/arrangement',function(ws,req){
  console.log('arrangement')
  ws.on('message', function(msg) {
    console.log('from server: ' + msg)
  })
})

export default router
