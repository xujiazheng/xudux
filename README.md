## xudux

react的状态管理工具，运用灵活

+ [安装](#安装)
+ [用法](#用法)
+ [文档](#文档)
    + [configure](#configure)
    + [connect](#connect)
+ [联系我](#联系我)

### 安装

```bash
npm install xudux
```

### 用法

index.js配置state初始值

```javascript

import React from 'react';
import ReactDOM from 'react-dom';
import configure from 'xudux';

import App from './app.js';

const initState = {
    name: '张三',
};
configure(initState);

ReactDOM.render(
    <App />
, document.getElementById('root'));

```

app.js中使用xudux做状态管理

```javascript
import React, {Component} from 'react';
import {connect} from 'xudux';
class App extends Component {
    constructor(props) {
        super(props);
    }
    handleClick() {
        this.props.setState$({
            name: '李四王五',
        });
    }
    render() {
        return (
            <>
                <button onClick={this.handleClick.bind(this)}>列表</button>
                <div>{this.props.name}</div>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        name: state.name,
    };
};
export default connect(mapStateToProps)(App);

```

### 文档


#### configure

`Function`：配置state

参数：

* state：`Object` 全局state对象。

```javascript
import configure from 'xudux';
const state = {
    name: '张三',
};
configure(state);
```

#### connect

`Function`：连接react组件与xudux store，与react-redux的connect类似

参数：

* mapStateToProps：`Function` 非必填， 此函数接收一个参数state，返回一个当前组件需要的state对象

返回：

一个可以链接react组件的函数

```javascript
import {connect} from 'xudux';

const mapStateToProps = (state) => {
    return {
        name: state.name,
    };
};

export default connect(mapStateToProps)(App);
```

#### 联系我

* 邮箱：18397968326@163.com
* issue: [https://github.com/xujiazheng/xudux/issues](https://github.com/xujiazheng/xudux/issues)