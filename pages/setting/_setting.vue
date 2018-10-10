<template>
  <section class="container">
    <div class="row">
      <div class="my-5" style="width:100%;">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="クラスの設定" active>
              <Strict/>
            </b-tab>
            <b-tab title="壁紙の設定" active>
            </b-tab>
            <b-tab title="電車の時刻表の設定" active>
              <TimetableSetting/>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </section>
</template>

<script>
import Strict from '~/components/strict/Strict.vue'
import TimetableSetting from '~/components/timetable/TimetableSetting.vue'
export default {
  components: {
    Strict,
    TimetableSetting
  },
}
</script>

<style scoped>
</style>
