const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: 'src/index.js',
  plugins: [new CleanWebpackPlugin(), new webpack.BannerPlugin(' waterfall.js \n by fengshangbin 2019-09-04 \n https://github.com/fengshangbin/WaterFall \n H5 water fall list Component')],
  devServer: {
    contentBase: './test',
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'waterfall.js',
    library: 'WaterFall',
    libraryTarget: 'umd'
  }
};
