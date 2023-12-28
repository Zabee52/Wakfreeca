const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'element-filter': './src/element-filter.js',
    'settings': './src/settings.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devtool: 'cheap-module-source-map', // 디버깅용 소스맵
};