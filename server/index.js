import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import expressWs from 'express-ws'
import session from 'express-session'

import api from './api'
import download from './download'
import websocket from './websocket'

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.set('port', port)

app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3 * 10 ** 10 }
}))

// Import API Routes
app.use('/api', api)
app.use('/download', download)

// Websocketを使う
expressWs(app)
app.use('/ws', websocket)

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
