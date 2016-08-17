module.exports = {
  name: 'client side, out to ./public',
  entry: [
    './src/index.js',
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1'],
      },
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
  	proxy: {
  		'/API**': 'http://localhost:1234',
  	},
    historyApiFallback: true,
    contentBase: './'
  }
};
