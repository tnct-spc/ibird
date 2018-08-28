<template>
  <svg ref="qrcode" v-html="svgCode" height="100" width="100"></svg>
</template>
<script>
import QRCode from 'qrcode'
export default {
  props: {
    url: String
  },
  data: () => {
    return {svgCode: ''}
  },
  mounted () {
    QRCode.toString(this.url, {
      type: 'svg',
      color: {
        light: '#0000'
      }
    }, (error, string) => {
      if (error) console.log(error)
      this.svgCode = string
    })
  }
}
</script>
<style></style>