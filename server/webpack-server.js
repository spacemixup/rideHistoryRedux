import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from '../webpack.config.babel';

export default (PORT) => {
  const frontServer = new WebpackDevServer(webpack(config), {
    proxy: {
      '/API**': 'http://localhost:3000',
    },
    historyApiFallback: true,
    contentBase: './public',
  });

  frontServer.listen(PORT, 'localhost');
};
