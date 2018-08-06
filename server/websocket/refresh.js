import { Router } from 'express'
import expressWs from 'express-ws'

const router = Router()
expressWs(router)

const receivers = []
router.ws('/refresh',function(ws, req){
  const idx = receivers.push(ws)-1
  ws.on('message', msg => {
    receivers.forEach((receiver,receiverId)=>{
      try{
        receiver.send()
      }catch(e){
        console.log(e)
        receivers.splice(receiverId,1)
      }
    })
  })
  ws.on('close', ()=>{
    receivers.splice(idx,1)
  })
})

export default router
