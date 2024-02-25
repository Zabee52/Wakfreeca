const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    background: './src/background.ts',
    'live/element-filter': './src/live/element-filter.ts',
    'live/settings': './src/live/settings.ts',
    'live/move-layer': './src/live/move-layer.ts',
    'live/user-list-searcher': './src/live/user-list-searcher.ts',
    'vod/element-filter': './src/vod/element-filter.ts',
    'vod/settings': './src/vod/settings.ts',
    'pages/index': './pages/index.ts',
    'common/initializer': './src/common/initializer.ts',
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
    extensions: ['.tsx', '.ts', '.js'], // 해석할 파일 확장자
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devtool: 'cheap-module-source-map', // 디버깅용 소스맵
  plugins: [new CleanWebpackPlugin()],
}
