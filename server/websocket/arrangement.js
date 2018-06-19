import { Router } from 'express'
import expressWs from 'express-ws'

const router = Router()
expressWs(router)
const receivers = []
router.ws('/move',function(ws, req){
  const idx = receivers.push(ws)-1

  ws.on('message', function(msg) {
    console.log('from server: ' + msg)
    receivers.forEach((receiver,receiverId)=>{
      if(receiverId!==idx){receiver.send(msg)}
    })
  })
  ws.on('close', ()=>{
    receivers.splice(idx,1)
  })
})

export default router
