# Asset Management 자원 관리

만약 getting started부터 시작했다면, 당신에게는 "Hello Webpack"이라는 화면이 보이는 프로젝트가 있을것입니다.

이제 지금 이미지 같은 다른 리소스들을 함께 웹펙으로 핸들링을 해볼것 입니다.


# 예제 1, css를 불러와보자

#### 0. 프로젝트 준비

``` sh

mkdir asset-management && cd asset-management
yarn init
yarn add --dev webpack webpack-cli lodash style-loader css-loader
yarn add lodash
```

#### 1. project setting 파일 생성

>   asset-management
>   |- package.json
>   |- webpack.config.js
>   |- /dist
>     |- index.html
>   |- /src
>     |- style.css
>     |- index.js
>   |- /node_modules

#### 2. ./webpack.config.js

``` js
const path = require('path')


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 웹펙은 정규표현식으로 어떤 파일들을 보고, 특별한 loader들에게 전할지 결정합니다. 이 때에는 .css붙은 파일들만
                        // style-loader, css-loader로 가게 될 것입니다.
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },
}
```
#### 3. ./dist/index.html

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Asset Management</title>
</head>
<body></body>

<script src="./bundle.js"></script>
</html>
```

#### 4. src/style.css

``` css
.hello {
  color: red;
}
```

#### 5. src/index.js

``` js
import _ from 'lodash';
import './style.css';

function component() {
  var element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  return element;
}
document.body.appendChild(component());
```

#### 7. package.json

``` json
{
  "name": "asset-management",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "./node_modules/.bin/webpack"
  },
  "devDependencies": {
    "css-loader": "^0.28.11",
    "style-loader": "^0.21.0",
    "webpack": "^4.10.2",
    "webpack-cli": "^3.0.1"
  },
  "dependencies": {
    "lodash": "^4.17.10"
  }
}
```

#### 6. execute command-line

``` sh
yarn start
```

### 결과

1. 작업이 끝나면, 먼저 결과 화면을 살펴보자.
2. ./dist/index.html w을 열어서 .hello에 대한 내용이 변경되어있는가? 를 확인해보자.
3. ./dist/bundle.js 에서 Ctrl + F 로 .hello 찾아 보기, 어떻게 작성되어있을까?

> 결론: *.css에 대한 내용은 js에서 담기게 되었다. 즉 번들링이 되었다.


# 예제 2, 이미지 불러오기

### 설치
```
yarn add --dev file-loader
```

### 프로젝트 구조

```
>   webpack-demo
>   |- package.json
>   |- webpack.config.js
>   |- /dist
>     |- bundle.js
>     |- index.html
>   |- /src
> +   |- icon.png
>     |- style.css
>     |- index.js
>   |- /node_modules

```

#### 1. ./webpack.config.js

``` js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // How to usage : https://github.com/webpack-contrib/style-loader
          'css-loader' // How to usage : https://github.com/webpack-contrib/css-loader
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader' // How to usage : https://github.com/webpack-contrib/file-loader
        ]
      }
    ]
  }
};
```

#### 2. src/index.js

``` js
import _ from 'lodash';
import './style.css';
import Icon from './icon.png';

function component() {
  var element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // Add the image to our existing div.
  var myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
```

#### 3. src/style.css

``` css
.hello {
  color: red;
  background: url('./icon.png');
}
```

#### 4. wget https://i.imgur.com/5Jr04eQ.png

``` bash
cd ${project}/asset-management/src
wget https://i.imgur.com/5Jr04eQ.png
mv 5Jr04eQ.png icon.png
cd ../
```
#### 5. ./src/style.css

``` css
.hello {
  color: red;
  font-family: 'nanum';
  width: 100%;
  height: 100%;
  background-image: url('./icon.png');
  background-size: 10%;
}
```


#### 6. execute command lines

``` bash
yarn start
```

# 결과

1. 결과값을 확인해 본다.
2. ./dist 에 들어가서 변경된 이미지의 내용을 확인한다.
3. 이미지의 내용물은 그대로 이나 파일명은 변경되었을 것이다. 변경된 파일명으로 bundle.js의 내용에는 어떻게 기술되어있는지 살펴보도록 하자.


# 예제 3, 폰트를 불러와 보자


#### 1. ./webpack.config.js

``` js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
```

#### 2. src/*.ttf

``` bash
wget https://fonts.gstatic.com/s/nanumgothic/v7/PN_3Rfi-oW3hYwmKDpxS7F_D-djb.ttf
mv PN_3Rfi-oW3hYwmKDpxS7F_D-djb.ttf nanum.ttf
```

#### 3. src/style.css

``` css
@font-face {
  font-family: 'nanum';
  src:  url('./nanum.ttf') format('ttf');
  font-weight: 600;
  font-style: normal;
}

.hello {
  color: red;
  font-family: 'nanum';
  width: 100%;
  height: 100%;
  background-image: url('./icon.png');
  background-size: 10%;
}
```

#### 4. execute command lines

``` sh
yarn start
```

### 결과

1. dist/에 어떤 파일들이 생겼는지 확인해본다. 아마 폰트파일.
2. 폰트파일은 css에서 불러오긴 하지만, 폰트파일 역시 webpack에서 호출 당하기 위해서는 `webpack.config.js`에서 file-loader에 명시해주지 않으면 안되나보다.


# 예제 4, data file 불러오기

#### 1. install dependencies

``` sh
yarn add --dev csv-loader xml-loader
```

#### 2. webpack.config.js

``` js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
};
```

#### 2. src/data.xml

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Mary</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Call Cindy on Tuesday</body>
</note>
```

#### 3. src/index.js

``` js
import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import Data from './data.xml';

function component() {
  var element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // Add the image to our existing div.
  var myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  console.log(Data); // console 출력

  return element;
}

document.body.appendChild(component());
```


#### 4. execute lines

``` sh
yarn start
```

### 결과

1. 브라우저를 실행시키고 F12 또는 Cmd + Opt + i를 눌러 개발자모드를 연다. 그리고 console로 가서 로그가 올바르게 나타나고 있는지 확인한다.
2. xml ,  csv 뭐 이런것도 불러 올 수 있긴 있구나...


