var path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index',
  output: {
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-eval-source-map ',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
}