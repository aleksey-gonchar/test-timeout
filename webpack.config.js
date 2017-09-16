'use strict'
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const HandlebarsPlugin = require('handlebars-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pkg = require('./package.json')

// Short usage reference
// `NODE_ENV` = development | test | production
// `LOG_LEVEL` = error | warn | info | debug
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'error'

let baseCfg = {
  cache: true,
  resolve: {
    extensions: [ '.js', '.jsx' ],
    modules: [
      'src',
      'node_modules'
    ]
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    library: '[name]',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: [
          /\.(spec|e2e)\.js$/,
          /node_modules/
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'url-loader?limit=100000'
      }
    ],
    noParse: [
      /\.(spec|e2e)\.jsx?$/,
      /LICENSE/,
      /README.md/
    ]
  },
  entry: {
    'bundle': './src/main.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/assets/users.json', to: 'users.json' },
      { from: 'src/assets/venues.json', to: 'venues.json' },
      { from: 'src/assets/bootstrap.min.css', to: 'bootstrap.min.css' }
    ]),
    new LoaderOptionsPlugin({
      debug: true
    }),
    new HandlebarsPlugin({
      entry: path.join(__dirname, './src/template.hbs'),
      output: path.join(__dirname, './dist', 'index.html'),
      data: {
        appName: pkg.name,
        env: process.env.NODE_ENV,
        logLevel: process.env.LOG_LEVEL,
      }
    })
  ],
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  devServer: {
    port: 8000,
    disableHostCheck: true,
    contentBase: 'dist/'
  }
}

let finalCfg
if (['development', 'test'].includes(process.env.NODE_ENV)) {
  finalCfg = webpackMerge(baseCfg, {
    devtool: 'inline-source-map'
  })
} else if (process.env.NODE_ENV === 'production') {
  finalCfg = webpackMerge(baseCfg, {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
          warnings: false,
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          screw_ie8: true
        },
        output: {
          comments: false
        },
        exclude: [/\.min\.js$/gi]
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0
      })
    ]
  })
}

module.exports = finalCfg
