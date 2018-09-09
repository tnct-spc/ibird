const environment = process.env.NODE_ENV || 'development'
const env = environment === 'production' ? {
  httpUrl: process.env.HTTP_URL || 'https://ibird.ml',
  wsUrl: process.env.WS_URL || 'wss://ibird.ml'
} : {
  httpUrl: process.env.HTTP_URL || 'https://localhost',
  wsUrl: process.env.WS_URL || 'wss://localhost'
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
