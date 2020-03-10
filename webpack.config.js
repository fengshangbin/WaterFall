const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: { waterfall: './src/index.js', waterfallVue: './src/waterfall-vue.js' },
  plugins: [new CleanWebpackPlugin(), new webpack.BannerPlugin(' waterfall.js \n by fengshangbin 2019-09-04 \n https://github.com/fengshangbin/WaterFall \n H5 easy water fall list Component')],
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
      },
      {
        test: /\.less$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }, { loader: 'postcss-loader' }]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    library: 'WaterFall',
    libraryTarget: 'umd'
  }
};
