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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/https://fonts.googleapis.com/css?family=Sawarabi+Mincho' }
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
  env: {
    mainUrl: process.env.MAIN_URL || 'localhost:3000',
    httpUrl: process.env.HTTP_URL || 'http://localhost:3000',
    wsUrl: process.env.WS_URL || 'ws://localhost:3000'
  }
}
