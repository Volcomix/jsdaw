var path = require('path')

module.exports = {
  entry: './src/index',
  output: {
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-eval-source-map ',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
}