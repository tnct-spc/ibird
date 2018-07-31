import { Router } from 'express'
import expressWs from 'express-ws'

const router = Router()
expressWs(router)

const receivers = []
router.ws('/alert',function(ws, req){
  const idx = receivers.push(ws)-1
  ws.on('message', msg => {
    receivers.forEach((receiver,receiverId)=>{
      if(receiverId!==idx){receiver.send(msg)}
    })
  })
  ws.on('close', ()=>{
    receivers.splice(idx,1)
  })
})

export default router
