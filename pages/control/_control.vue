<template>
    <section>
      <Control/>
      <ControlSelecter/>
    </section>
</template>
<script>
import Control from '~/components/Control.vue'
import ControlSelecter from '~/components/ControlSelecter.vue'
import axios from 'axios'

export default {

  components:{
    Control,
    ControlSelecter
  },
}
</script>
<style scoped>
</style>
