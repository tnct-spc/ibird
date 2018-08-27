<template>
  <div class="container">
    <br/>
    <b-card>
    <form v-if="!$store.state.authUser" @submit.prevent="login">
      <b-alert show variant="danger" v-if="formError">{{ formError }}</b-alert>
      <b-form-input v-model="formUsername"
                  type="text"
                  placeholder="username"
                  name="username"></b-form-input>
      <b-form-input v-model="formPassword"
                  type="password"
                  placeholder="password"
                  name="password"></b-form-input>
      <b-btn class="success" type="submit">Login</b-btn>
    </form>
    <div v-else>
      <b-alert show variant="success">
        <h4 class="alert-heading">ログインしました</h4>
        <hr>
        <b-btn class="warning" @click="logout">Logout</b-btn>
        <p>
          <b-link href="/control/1">コントロールページ</b-link>
        </p>
      </b-alert>
    </div>
    </b-card>
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
<style>
.container {
  padding: 100px;
}
</style>