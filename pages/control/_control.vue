<template>
    <section>
        <ControlSelecter/>
        <Control></Control>
    </section>
</template>
<script>
import Control from '~/components/Control.vue'
import ControlSelecter from '~/components/ControlSelecter.vue'
export default {
  components:{
    Control,
    ControlSelecter
  },
}
</script>
<style scoped>
</style>
