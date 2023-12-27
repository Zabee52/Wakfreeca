const path = require('path');

module.exports = {
  mode: 'development', // 개발용 설정. 프로덕션의 경우 'production'으로 변경
  entry: './src/element-filter.js', // 엔트리 파일
  output: {
    path: path.resolve(__dirname, 'dist'), // 번들 파일을 저장할 경로
    filename: 'element-filter.js', // 번들 파일 이름
  },
  devtool: 'cheap-module-source-map', // 디버깅용 소스맵
};