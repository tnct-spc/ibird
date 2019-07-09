const host = 'localhost:3000'

const environment = process.env.NODE_ENV || 'development'
const env = environment === 'production' ? {
  httpUrl: process.env.HTTP_URL || 'https://ibird.tokyo-ct.org',
  wsUrl: process.env.WS_URL || 'wss://ibird.tokyo-ct.org'
} : {
  httpUrl: process.env.HTTP_URL || 'http://' + host,
  wsUrl: process.env.WS_URL || 'ws://' + host
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'ibird',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP&amp;subset=japanese' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/app.scss',
    '~/assets/css/main.css'
  ],
  modules: [
    ['bootstrap-vue/nuxt', { css: false }]
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  env: env
}
