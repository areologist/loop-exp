const webpack = require('webpack');
const config = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', (err, result) => {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:3000/');
});
