const path = require('path');
// const slsw = require('serverless-webpack');

module.exports = {
  entry: "./handler.ts",
  resolve: {
    extensions: [
      '.js',
      '.ts'
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: __dirname,
    filename: 'handler.js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
      }
    ]
  }
};
