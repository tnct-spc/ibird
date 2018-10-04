<template>
  <section class="container">
    <h1>天気情報</h1>
    <form>
        <div class="form-group">
            <div class="row">
                <div class="col">
                    <label>緯度</label>
                    <input class="form-control" pattern="\d+" required>
                    <br>
                    <label>経度</label>
                    <input class="form-control" pattern="\d+" required>
                </div>
                <div style="col">
                    <input type="submit" value="レビュー" style="width: 360px; margin: 9px;">
                    <br>
                    <img width="360px" height="360px" style="margin: 9px; margin-right: 18px;">
                </div>
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
