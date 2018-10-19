<template>
  <svg ref="qrcode" v-html="svgCode" height="100%" width="100%"></svg>
</template>
<script>
import QRCode from 'qrcode'
import axios from 'axios'
import { setInterval } from 'timers';

export default {
  props: {
    classid: String
  },
  data: () => {
    return {svgCode: ''}
  },
  created(){
    setInterval(this.recreateQr, 10000)
  },
  mounted () {
    QRCode.toString('0', {
      type: 'svg',
      color: {
        light: '#0000'
      }
    }, (error, string) => {
      if (error) console.log(error)
      this.svgCode = string
    })
  },
  methods: {
    recreateQr: function(){
      axios.get(process.env.httpUrl + '/api/issue-qr-uri',{
        params: { classid: this.classid }
      }).then(res => {
        console.log(process.env.httpUrl + '/qrlogin/?classid=' + this.classid +'&pass='+res.data)
        QRCode.toString(process.env.httpUrl + '/qrlogin/?classid=' + this.classid +'&pass='+res.data, {
          type: 'svg',
          color: {
            light: '#0000'
          }
        }, (error, string) => {
          if (error) console.log(error)
          this.svgCode = string
        })
      })
    }
  }
}
</script>
<style></style>