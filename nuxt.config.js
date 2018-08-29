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
  env: {
    mainUrl: process.env.MAIN_URL || '192.168.1.29:3000',
    httpUrl: process.env.HTTP_URL || 'http://192.168.1.29:3000',
    wsUrl: process.env.WS_URL || 'ws://192.168.1.29:3000'
  }
}
