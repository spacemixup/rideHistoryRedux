// import path from 'path';
// var nodeModulesPath = path.resolve(__dirname, 'node_modules');
// var buildPath = path.resolve(__dirname, 'public', 'build');
// var mainPath = path.resolve(__dirname, 'app', 'main.js');

const path = require('path');

module.exports = {
  devtool: 'eval',
  name: 'client side, out to ./public',
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-1'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
