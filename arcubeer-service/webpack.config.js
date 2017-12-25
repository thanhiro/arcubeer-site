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
    path: path.join(__dirname, '.webpack'),
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
