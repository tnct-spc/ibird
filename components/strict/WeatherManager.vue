<template>
  <section class="container">
    <h1>天気情報</h1>
    <form>
        <div class="form-group">
            <div class="row">
                <div class="col">
                    <label>緯度</label>
                    <input type="text" class="form-control" pattern="\d+" required>
                    <br>
                    <label>経度</label>
                    <input type="text" class="form-control" pattern="\d+" required>
                </div>
                <div class="col">
                    <input @click="display = true" type="submit" value="レビュー" style="width: 360px; margin: 9px;">
                    <br>
                    <img v-if="display" src="https://map.yahooapis.jp/map/V1/static?appid=dj0zaiZpPXVZaDlrczVieXNFYSZzPWNvbnN1bWVyc2VjcmV0Jng9ZGE-&lat=35.632789&lon=139.294293&z=12&mode=map&overlay=type:rainfall|date:201810101820|datelabel:on&output=jpeg" width="360px" height="360px" style="margin: 9px; margin-right: 18px;">
                </div>
            </div>
        </div>
    </form>
  </section>
</template>

<script>
export default {
    data() {
        return {
            display: false
        }
    }
}
</script>


<style scoped>
.container {
    padding-top: 2rem;
    padding-bottom: 2rem;
}
.form-control {
    width: 36rem;
}
</style>

