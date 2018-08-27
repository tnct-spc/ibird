<template>
  <div>
    <h1>Super secret page</h1>
    <router-link to="/auth">Back to the home page</router-link>
  </div>
</template>

<script>
export default {
  // データをこのコンポーネントにセットする必要がないため fetch() を使う
  fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/auth')
    }
  }
}
</script>