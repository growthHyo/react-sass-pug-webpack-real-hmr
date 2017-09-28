const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader']
})

var cssConfig = isProd
  ? cssProd
  : cssDev;

module.exports = {
  entry: {
    app: ["react-hot-loader/patch","./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.pug$/,
        use: ['pug-loader']
      }, {
        test: /\.(png|jpg|gif)/,
        use: [
          'file-loader?name=[name].[ext]',
          'image-webpack-loader'
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "./dist"),
    compress: true,
    port: 9000,
    hot: true,
    stats: "errors-only",
    open: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpacks projects + plugin',
      minify: false,
      hash: true,
      template: './views/index.pug'
    }),
    new ExtractTextPlugin({
      filename: "[name].bundle.css",
      disable: !isProd,
      allChunks: true
    })
  ]
}
