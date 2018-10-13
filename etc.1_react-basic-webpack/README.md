# react 빌드를 해볼거에요

## 프로젝트 셋팅
1. 프로젝트를 초기화 해 줍시다.

``` bash
yarn init
```

2. 리엑트를 쓸 거니까 리엑트 라이브러리를 다운 받습니다.

``` bash
yarn add react react-dom
```

3. webpack도 쓸거니까 라이브러리를 다운받습니다. 그리고 webpack은 개발 모드에서만 쓰니까 dev에 dependency가 생길 수 있도록 해 줍시다.


``` bash
yarn add --dev webpack webpack-cli webpack-dev-server
# webpack : webpack의 내장 함수들을 쓰거나 cli가 읽을 수 있게 해줄 거에요.
# webpack-cli : webpack.config.js를 실행시키기위한 명령 프로그램입니다.
# webpack-dev-server : webpack-dev-server는 hotloader를 지원하는 임시의 웹 서버에요. html페이지를 띄울때 매우 유용해용
```

4. 브라우저에 친화적인 js를 출력하기위해 babel의 라이브러리를 설치해요! 이것도 역시 개발모드에서 쓰니까 dev에 dependency가 생길 수 있도록 해줍니다.

``` bash

yarn add --dev babel-core babel-loader babel-preset-react babel-preset-env
# babel-core: babel의 기본 라이브러리를 설치하고
# babel-loader: webpack에서 babel을 불러올거에요.
# babel-preset-react: react.js의 `JSX`도 읽어야 하고 
# babel-preset-env : `.babelrc` 도 읽어야 하고
# 
```

5. webpack의 플러그인들을 활용해서, webpack의 처리과정을 거친 파일들에 대한 후속작업을 수행해줄거에요.

``` bash 
yarn add --dev html-webpack-plugin clean-webpack-plugin
# html-webpack-plugin: HTML파일의 내용을 동적으로 수정하거나, webpack을 이용한 결과값을 불러오는데 사용할거에요.
# clean-webpack-plugin: 빌드 코드를 만들때마다, 기존에 만들었던 빌드 코드들을 지우고 다시 새로 만듭니다.
```

6. 한방 명렁어

``` bash
yarn add react react-dom && yarn add --dev webpack webpack-cli webpack-dev-server \
babel-core babel-loader babel-preset-react babel-preset-env \
html-webpack-plugin clean-webpack-plugin
```

## 프로젝트 파일 생성

>   react-basic-webpack
>   |- package.json
>   |- /node_modules
>   |- webpack.config.js
>   |- /src
>     |- index.js
>     |- index.html
>     |- /components
>        |- App.js

