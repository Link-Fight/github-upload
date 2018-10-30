'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
let outputPath = `../../../agri_bpmn_v3/trunk/public/pm/v4/`;
const proxyOption = {
  target: 'http://localhost:97',
  changeOrigin: true
}
const muProxyOption = {
  // target: 'http://mu.heliwebs.com',
  target: 'http://localhost:97',
  changeOrigin: true
}
const testServer = {
  target: 'http://localhost:3000'
}
const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/common': muProxyOption,
      '/wechat': proxyOption,
      '/resource': proxyOption,
      '/home': testServer
    },

    // Various Dev Server settings
    host: '0.0.0.0' || process.env.HOST , // can be overwritten by process.env.HOST
    port: process.env.PORT || 9004, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, outputPath + 'index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, outputPath),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
