import { Router } from 'express'
import expressWs from 'express-ws'

const router = Router()
expressWs(router)

const receivers = []
router.ws('/alert',function(ws, req){
  const idx = receivers.push(ws)-1

  let url='http://svir.jp/eew/data.json'
  let request=new XMLHttpRequest()
  request.open('GET',url)

  request.onreadystatechange=function(){
    if(request.readyState!=4){
    }else if(request.status!=200){
      console.log("200")
    }else{
      let result=request.responseText;
    }
  }

  ws.on('message', msg => {
    console.log('alert added: ' + msg)
    receivers.forEach((receiver,receiverId)=>{
      if(receiverId!==idx){}
    })
  })
  ws.on('close', ()=>{
    receivers.splice(idx,1)
  })
})

export default router
