var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var log4js = require('log4js');
var env = process.env.NODE_ENV;

var domain = require('./config/' + 'domain.' +env + '.js');
global.domain = domain;
var isProduction = env == 'production';
global.isProduction = isProduction;

var config = require('./config/' + 'webpack.config.' +env + '.js');

var port  = global.domain.static_port;

log4js.loadAppender('file');

log4js.addAppender(log4js.appenders.file('logs/app.log'), 'frontEnd');

var logger = log4js.getLogger('frontEnd');

module.exports = function() {
  var compiler = webpack(config);
  var bundleStart = null;
  compiler.plugin('compile', function() {
    logger.info('Bundling...');
    bundleStart = Date.now();
  });

  // We also give notice when it is done compiling, including the
  // time it took. Nice to have
  compiler.plugin('done', function() {
    logger.info('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });
  new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    quiet: false,
    historyApiFallback: true,
    stats: { colors: true }
  }).listen(port, global.domain.static_ip, function (err, result) {
    if (err) {
      logger.error(err);
    }
    logger.info('Listening at localhost:' + port);
  });
}

