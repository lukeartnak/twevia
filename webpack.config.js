const path = require('path');

module.exports = {

  entry: './app/index.js',

  output: {
    path: path.resolve('public'),
    filename: 'app.js'
  },

  module: {
    rules: [
      {test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.scss?$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.(png|jpg)?$/, loader: 'file-loader', exclude: /node_modules/}
    ]
  }

}
