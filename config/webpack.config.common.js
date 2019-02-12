const { resolve, join } = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const IS_DEV = process.env.NODE_ENV !== 'production'

module.exports = {
  target: 'web',
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    publicPath: '/',
    path: resolve(__dirname, '..', 'build', 'client'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      // { test: /\.jsx?$/, loader: 'babel', },
      // { test: /\.js?$/, loader: 'babel', },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: { sourceMap: IS_DEV }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: IS_DEV ? '[path]-[name]_[local]' : '[name]_[local]_[hash:5]', // [hash:base64]
                modules: true,
                sourceMap: IS_DEV
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: IS_DEV }
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: IS_DEV }
            }
          ]
        })
      },
      {
        test: /\.(png|gif|jpg|svg|mp4|webp|webm|eot|ttf|woff|woff2)$/,
        include: [resolve(__dirname, '..', 'src', 'client', 'assets')],
        loader: 'file-loader'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.mp3$/,
        include: [resolve(__dirname, '..', 'src', 'client', 'assets')],
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: IS_DEV
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  resolve: {
    modules: ['node_modules', join('src', 'client')]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  stats: {
    assetsSort: '!size',
    children: false,
    chunks: false,
    colors: true,
    entrypoints: false,
    modules: false
  },
  devServer: {
    https: true
  }
}
