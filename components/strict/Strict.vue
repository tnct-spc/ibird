<template>
  <section>
    <h1>掲示板設定ページ</h1>
    <div>
        <span>全学年数 : </span>
        <input v-model.number="yearsNumber" type="number">
    </div>
    <div>
        <span>学科 : </span>
        <div  v-for="(course, index) in courses" :key="index">
            {{course}}
        </div>
    </div>
  </section>
</template>

<script>
export default {
    data() {
        return {
            yearsNumber: 5,
            courses: ['J','M','C']
        }
    }
}
</script>
<style>
</style>
