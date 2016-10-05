var path = require('path');
var webpack = require('webpack');

module.exports = function (environment) {
  var config = {
    context: path.join(__dirname, './browser/js'),
    entry: "./app",
    output: {
      path: path.join(__dirname, './public/'),
      filename: "bundle.js"
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'ng-annotate!babel?presets[]=es2015' }
      ]
    }
  };

  // if (environment === 'production') {
  //   config.plugins = [
  //     new webpack.optimize.UglifyJsPlugin({
  //         compress: {
  //             warnings: false
  //         },
  //         output: {
  //             comments: false
  //         }
  //     })
  //   ]
  // }

  return config;
};

