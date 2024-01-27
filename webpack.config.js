const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'element-filter': './src/element-filter.ts',
    settings: './src/settings.ts',
    background: './src/background.ts',
    'move-layer': './src/move-layer.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // .ts or .tsx
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'] // 해석할 파일 확장자
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devtool: 'cheap-module-source-map', // 디버깅용 소스맵
  plugins: [
    new CleanWebpackPlugin(),
  ],
}
