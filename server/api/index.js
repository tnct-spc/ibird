import express from 'express'
import { Nuxt, Builder } from 'nuxt'

import api from './api'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
<template>
+  <section class="container">
+    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
+  </section>
+</template>
+
+<script>
+import axios from '~/plugins/axios'
+export default {
+  name: 'id',
+  asyncData ({ params, error }) {
+    return axios.get('/api/users/' + params.id)
+      .then((res) => {
+        return { user: res.data }
+      })
+      .catch((e) => {
+        error({ statusCode: 404, message: 'User not found' })
+      })
+  },
+  head () {
+    return {
+      title: `User: ${this.user.name}`
+    }
+  }
+}
+</script>
+<style>
+img{
+  width:562px;
+  headth:795px;
+}
+</style>

10  server/api/index.js
