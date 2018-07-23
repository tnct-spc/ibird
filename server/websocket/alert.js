import { Router } from 'express'
import expressWs from 'express-ws'
const router = Router()
expressWs(router)

let url = "http://svir.jp/eew/data.json"
let result,c=0
function {
  setInterval("request(url)",5000)
}

function request(url) {
  let request = new XMLHttpRequest()
  request.open("GET",url)
  request.onreadystatechange = function(){httpresponse(request)}
  request.send(null)
}

function httpresponse(request){
  if(request.readyState!=4){
    }else if(request.status!=200){
      console.log("200")
    }else{
      let confirmation = request.responseText
      c++
      if(c!=0&&confirmation!=result){
        result = confirmation
      }
    }
  }
}
