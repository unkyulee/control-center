var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    pallet: ['webpack/hot/dev-server', './window/pallet/index.js'],
    gui: ['webpack/hot/dev-server', './window/gui/index.js'],
    data: ['webpack/hot/dev-server', './window/data/index.js'],
    script: ['webpack/hot/dev-server', './window/script/index.js'],
    page: ['webpack/hot/dev-server', './window/page/index.js']
  },

  output: {
    filename: "dist/[name].entry.js",
    publicPath: 'http://localhost:8080/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$")),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    })
  ],

  /**
   * https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
   */
  target: 'electron-renderer'
}
