const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // css-loader와 style-loader의 순서는 중요.
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
    new webpack.HotModuleReplacementPlugin(), // js 가 변경되면 바로 변경된 js가 반영되지 않는다.
    // 단 DOM 이 변경되면 새로고침이 자동적으로 발생하기 때문에 그 당시에는 변경은 된다.
    // 문제는 html이 아닌 DOM, js가 변경되었을 때 dom을 조작하는게 없다면 js의 변경이 발생하지 않는다는 것.
    // 중요 포인트는 파일에 따른게 아니라 dom의 변경유무에 따라 다르다는 것.
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
