# Webpack-basic 시작하기 


1. Setting npm & package.json & node_modules

``` sh

mkdir getting-started && cd getting-started
yarn init
yarn add --dev webpack webpack-cli
yarn add lodash

```

2. Setting project structure

>    webpack-basic
>   |- package.json
> + |- index.html
> + |- /src
> + |-   index.js

# 일반적인 우리의 사용 예

### src/index.js

``` js
function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

### index.html

``` html
<!doctype html>
<html>
  <head>
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

### 예제에 대한 설명

이 예제는 매우 별거 아닌것 처럼 저희가 평소 사용하던 방식 그 대로 입니다.
여기에서는 어떠한 번들링(bundling) 작업이 발생하지 않았죠, 그저 lodash라이브러리를 `unpkg.com`에서 불러왔을 뿐입니다.

하지만 우리는 알아야 할것이 있습니다.
`src/indexjs` 에서는 `_(lodash)`라이브러리를 사용했고, index.js에서는 이를 호출했는지, 어디서 불러왔는지 알 수 없습니다.
우린 그저 `_ (lodash)`는 global한 어딘가에 선언이 되어있고, 일단은 그 것을 사용할  수 있다는 것이지요.

이렇게 되었을 경우 3가지의 문제가 발생하게 됩니다.

1. `src/index.js`는 `lodash`가 로드 되지 않으면, 실행할 수 있을때 까지 기다리거나, 아예 에러로 나타날 때가 존재하게 됩니다.
2. 의존성이 있는 코드가 사라져버리게 되고, 호출의 순서가 올바르지 못할때, `src/index.js`는 작동하지 않을 수 있습니다.
3. dependency에 추가 되어있지만, 사용하지 않았을 경우, 브라우저에서는 쓸대없는 라이브러리를 다운받아 오기 떄문에, 네트워크 리소스를 낭비하게 됩니다.

# CLI(명령어)를 통한 webpack의 사용

### project

>   webpack-basic
>   |- package.json
> + |- /dist
> +   |- index.html
> - |- index.html
>   |- /src
>     |- index.js

``` bash
yarn add lodash
```

### Source

#### src/index.js


``` js
import _ from 'lodash';

function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

#### dist/index.html

``` html
<!doctype html>
<html>
<head>
  <title>Getting Started</title>
  <!-- lodash 는 안쓰니까 지워줍니다. -->
  </head>
  <body>
  <!-- src/index.js 는 사용하지 않고, 웹팩을 통한 번들된 js를 사용할것입니다. -->
  <script src="bundle.js"></script>
</body>
</html>
```

### 명령어 실행

``` sh
./node_modules/.bin/webpack --output-filename bundle.js --mode development
# --output-filename : bundle.js  => 결과: dist/bundle.js
# --mode : development => 값: [development, production] 둘 다 사용 가능하다.
```

# API를 통한 webpack의 사용

### 모듈들

소스코드에 `import`와 `export` statements 들은 ES2015에 공식 standardized 되어 있습니다. 하지만 아직 브라우적에서는 사용할 수 없습니다.
웹팩은 이 들을 사용할 수 있게 해줍니다. 

사실 웹팩은 `변환`해주는 녀석입니다. 최신의 ES 버전의 코드들을 옛날 브라우저도 읽을 수 있게 해주도록 말이죠. `dist/bundle.js`를 열어보세요.
`import` statement가 `export`로 변환되어있고, 최신의 ES 버전들의 코드들이 어느새인가 못생긴 코드들로 변환되어 있을것입니다.

여기서 webpack 에 대해 좀 더 자세히 알아두어야 할 것이 있는데, webpack은 기본적으로는 이전 버전의 코드로 `변환`하는것이 아닙니다.
그렇기 때문에 변환할 버전을 지정해주지 않으면, 언제 버전인지도 모를 ES버전으로 `변환`되어버립니다.
그러므로 `변환`할 ES버전을 지정해 주어야 합니다. 그 것의 역할은 `babel` 이 할것입니다

### api 사용

#### project

>   webpack-basic
>   |- package.json
> + |- webpack.config.js
>   |- /dist
>     |- index.html
>   |- /src
>     |- index.js

#### ./webpack.config.js

``` js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

```

#### 명령어 실행

``` sh
./node_modules/.bin/webpack --config webpack.config.js --mode development
# --config webpack.config.js => webpack.config.js는 현재 웹팩 명령어의 기본 설정 파일로써 지정되어있다. 만약 설정파일이 다른 이름이라면,
# --config option을 사용하여, 파일 이름을 입력하면 된다

./node_modules/.bin/webpack
```


