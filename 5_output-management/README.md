# 출력 관리


# 프로젝트 준비

``` sh
mkdir output-management && cd output-management
yarn init
yarn add --dev webpack webpack-cli style-loader css-loader file-loader csv-loader xml-loader
yarn add lodash
```

# 프로젝트 구성

>   output-manangement
>   |- package.json
>   |- webpack.config.js
>   |- /dist
>   |- /src
>     |- index.js
>     |- print.js
>   |- /node_modules


# 예제 1, bundling js

#### 1. src/print.js

``` js
export default function printMe() {
  console.log('I get called from print.js!');
}
```

#### 2. src/index.js

``` js
import _ from 'lodash';
import printMe from './print.js';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
```

#### 3. ./dist/index.html

``` html
<!doctype html>
<html>
  <head>
    <title>Output Management</title>
    <script src="./print.bundle.js"></script>
  </head>
  <body>
    <script src="./app.bundle.js"></script>
  </body>
</html>
```

#### 4. ./webpack.config.js

``` js
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

#### 5. execute progrem


# 결과

output 파일에 이름을 직접 지정할 수 있다.

# 예제 2, HTML 파일도 웹팩으로 한번 만들어보자.


#### 1. install dependency `html-webpack-plugin`

``` sh
yarn add --dev html-webpack-plugin
```

#### 2. ./webpack.config.js

``` js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

#### 3. execture Program

``` sh
yarn start
```

# 결과

응? html 파일의 내용을 변경해서 새로 쓰네..?!

# 예제 3, dist디렉토리를 깔끔하게 관리하자


#### 1. install `clean-webpack-plugin` 

``` sh
yarn add --dev clean-webpack-plugin
```
#### 2. ./webpack.config.js

``` js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

#### 3. execute program

``` sh
yarn start
```

# 결론

오? dist 디렉토리를 날리고 새로 만들어주네..!?