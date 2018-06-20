import { Router } from 'express'
import expressWs from 'express-ws'

const router = Router()
expressWs(router)

const receivers = []
const state = []
router.ws('/ws/move',function(ws, req){
  const idx = receivers.push(ws)-1
  ws.on('message', msg => {
    const parsedMsg = JSON.parse(msg)
    state[parsedMsg.paperId] = parsedMsg
    receivers.forEach((receiver,receiverId)=>{
      if(receiverId!==idx){
        try{
          receiver.send(msg)
        }catch(e){
          console.log(e)
          receivers.splice(receiverId,1)
        }
      }
    })
  })
  ws.on('close', ()=>{
    receivers.splice(idx,1)
  })
})
router.get('/all-positions',(req, res)=>{
  res.json(Object.values(state))
})

export default router
