var webpack = require('webpack');
var path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'lib');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/components/countdown_timer.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader"
        ]
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    }),
    new webpack.DefinePlugin({
      'process.env.COUNTDOWN_EVENTS': JSON.stringify(process.env.COUNTDOWN_EVENTS)
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: '**/*.css',
      failOnError: false,
      quiet: false,
    }),
  ],
};

module.exports = config;
