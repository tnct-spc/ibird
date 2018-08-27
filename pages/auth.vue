<template>
  <div class="container">
    <form v-if="!$store.state.authUser" @submit.prevent="login">
      <p v-if="formError" class="error">{{ formError }}</p>
      <p>Username: <input v-model="formUsername" type="text" name="username" ></p>
      <p>Password: <input v-model="formPassword" type="password" name="password" ></p>
      <button type="submit">Login</button>
    </form>
    <div v-else>
      Hello {{ $store.state.authUser.username }}!
      <button @click="logout">Logout</button>
    </div>
    <p><nuxt-link to="/control/1">コントロールページ</nuxt-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formError: null,
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
      } catch (e) {
        this.formError = e.message
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style>
.container {
  padding: 100px;
}
.error {
  color: red;
}
</style>