const webpack = require('webpack');
const path = require('path');

module.exports = {
  name: 'client side, out to ./public',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
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
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
        include: path.join(__dirname, 'src'),
      },
    ],
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
  },
  devServer: {
    proxy: {
      '/api/**': 'http://localhost:1234',
    },
    historyApiFallback: true,
    contentBase: './public',
    hot: true,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
};
