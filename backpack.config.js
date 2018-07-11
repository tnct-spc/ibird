var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/index.js'
    config.plugins = [
        new CopyWebpackPlugin([{from: './server/models/', to:'./server/models/'}], {ignore: ['index.js']})
    ]
    return config
  }
}
