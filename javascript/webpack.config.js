const path = require('path');

module.exports = {
  entry:"./src/index.js",
  mode: 'development',
  externals : {
    axios: 'axios'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "mindsdb.umd.js",
    library: "MingsDB",
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: `typeof self !== 'undefined' ? self : this`,  // https://github.com/webpack/webpack/issues/6522
    // globalObject: this,
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        "presets": [
          ["@babel/preset-env", {
            "targets": "> 1%, not dead, node > 10"
          }]
        ], // es2015 dy default
        "plugins": [
          ["@babel/plugin-proposal-class-properties", { "loose": true }],
          "@babel/plugin-transform-runtime"
        ]
      },
      exclude: /node_modules/
    }]
  },
  devtool: "source-map",
  context: __dirname,
  target: "web"
};
