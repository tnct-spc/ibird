<template>
  <section class="container">
    <h1>天気情報</h1>
    <form>
        <div class="form-group">
            <div style="float: left;">
                <label>緯度</label>
                <input class="form-control" pattern="\d" required>
                <br>
                <label>経度</label>
                <input class="form-control" pattern="\d" required>
            </div>
            <div style="float: right;">
                <button style="width: 21em; margin: 1em;">レビュー</button>
                <br>
                <img width="360px" height="360px" style="margin-bottom: 1em;">
            </div>
        </div>
    </form>
  </section>
</template>

<style scoped>
.container {
    padding-top: 2rem;
    padding-bottom: 2rem;
}
.form-control {
    width: 36rem;
}
</style>