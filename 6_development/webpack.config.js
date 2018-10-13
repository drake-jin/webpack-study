const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      script: ['app.bundle.js', 'print.bundle.js'],
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
}


// npm run server: server.js에서는 핫 로더 기능을 제공하지 않는다. 새로고침을 눌러야지 바뀐다. 이것은 서버를 이용해서 접근하는 방식
// npm run watch: 여기에서도 역시 핫 로더 기능을 제공하지않는다. 새로고침을 눌러야지만 바뀐다. 이것은 직접 로컬파일의 .html에 접근하는 방식

// npm run start(webpack-dev-server): 서버로 제공하기도 하며, 핫 로더 기능을 제공한다. 새로고침 안해도 변경된 파일을 새로 로드할 뿐이기 때문.
