## 初识调试
>调试就是通过某种信道(比如`WebSocket`)把运行时信息传递给开发工具，做UI的展示和交互，辅助开发者排查问题、了解代码运行状态等.

- 常用调试方法：`Chrome DevTools`、`VSCode Debugger`、`Vue/React DevTools(Chrome插件形式)`等工具来调试网页、Node.js、React/Vue的代码.

**通用部分**
- `frontend`：负责对接调试协议，做UI的展示和交互
- `backend`：负责将运行时状态通过调试协议暴露出来.
- 调试协议：负责对接`frontend`和`backend`
- 信道：用于传输协议数据

**不同部分**
- `VSCode Debugger`多了一层`Debugger Adapter`，用于跨语言的复用.
- `Vue/React DevTools`通过向页面注入backend代码，然后通过Background实现双向通信等.

>使用`VSCode Debugger`来调试，这样写代码和调试都用同一个工具，不用切换，而且还可以边调试边写代码.

## VSCode Debugger配置
创建调试配置文件可以直接从Debug窗口的`create a launch.json file`快速创建.

**创建Debug配置的两种方式**
- `launch`: 将指定url对应的网页跑起来，指定调试端口，然后frontend自动attach到这个端口.
- `attach`: 如果已经存在一个在调试模式跑的浏览器了，直接连接上就行(直接attach)。

**配置了解（request为launch才有的配置）**
- `userDataDir`: `user data dir`是保存用户数据的地方，比如浏览历史，cookie等，一个数据目录只能跑一个chrome，所以默认会创建临时用户数据目录（访问不到默认下的目录，那么书签、devtools都用不了），想用默认的目录可以把这个配置设为false
- `runtimeExecutable`: 切换调试用的浏览器，可以是stable、canary或者自定义的（canary是开发版，当我们想用默认的数据目录，又因为谷歌我们还有别的用处，不能仅用于调试，此时可以通过指定为canary来打开开发版的）
- `runtimeArgs`：启动浏览器时传递的启动参数
  - `--auto-open-devtools-for-tabs`: 自动打开devtools
  - `--incognito`: 无痕模式
- `sourceMaps`: false。关闭sourceMap调试
- `sourceMapPathOverrides`：对 sourcemap 到的文件路径做一次映射，映射到 VSCode workspace 下的文件，这样调试的文件就可以修改了
- `file`: 直接指定某个文件，然后启动调试

## sourcemap的原理与作用
通过sourcemap，我们可以直接调试源码

>`sourcemap`是关联编译后的代码和源码的，通过一个个行列号的映射.
- `mapping`: 编译后代码的第3行第4列，对应源码的第8行第5列，叫做一个mapping.

**`sourcemap格式`**
```json
{
  "version" : 3,
  "file": "out.js",
  "sourceRoot" : "",
  "sources": ["foo.js", "bar.js"],
  "names": ["a", "b"],
  "mappings": "AAgBC,SAAQ,CAAEA;AAAEA",
  "sourcesContent": ["const a = 1; console.log(a)", "const b = 2; console.log(b)"]
}
```
- `version`: sourcemap的版本，一般为3
- `file`: 编译后的文件名
- `sourceRoot`: 源码根目录
- `names`: 转换前的变量名
- `sources`: 源码文件名（多个的原因是因为编译后的产物可能是由多个源文件合并的）
- `sourcesContent`: 每个sources对应的源码的内容
- `mappings`: 一个个位置映射

>`mappings`通过分号`;`和逗号`,`分隔
- 一个分号代表一行
- 每一行可能有多个位置的映射，用`,`分隔

`mapping`结构(`VLQ编码`)有5位，分别有以下含义：
1. 转换后代码的第几列(行数通过分号`;`来确定)
2. 转换前的那个源码文件，保存在sources中，这里通过下标索引
3. 转换前的源码的第几行
4. 转换前的源码的第几列
5. 转换前的源码的哪个变量名，保存在names里，这里通过下标索引

**TS类型中使用sourcemap**
>生成的类型和源码中定义的关联
```json
{
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true, // 生成d.ts声明文件
    "declarationMap": true // 生成sourcemap
  }
}
```
这样配置我们就可以通过在编译后的产物中直接点击某个类型跳转到源码中的对应的地方了

**`sourcemap`的生成**
需要知道源码的哪个位置对应到编译后代码的哪个位置.

编译工具在将源码转为目标代码之前会将源码转为AST，而**AST保留了源码的位置**，然后进行 AST 的各种转换之后会打印成目标代码，打印的时候是一行行一列列的拼接字符串，这时候就有了**目标代码中的位置。**

## webpack的sourcemap配置
webpack 的 sourcemap 配置比较麻烦，但也是有规律的。
它是对一些基础配置按照一定顺序的组合，理解了每个基础配置，知道了怎么组合就理解了各种 devtool 配置。
- `eval`：浏览器 devtool 支持通过 `sourceUrl` 来把 eval 的内容单独生成文件，还可以进一步通过 `sourceMappingUrl` 来映射回源码，webpack 利用这个特性来简化了 sourcemap 的处理，可以直接从模块开始映射，不用从 bundle 级别。
- `cheap`：只映射到源代码的某一行，不精确到列，可以提升 sourcemap 生成速度
- `source-map`：生成 sourcemap 文件，可以配置 `inline`，会以 dataURL 的方式内联，可以配置 `hidden`，只生成 sourcemap，不和生成的文件关联
- `nosources`：不生成 sourceContent 内容，可以减小 sourcemap 文件的大小
- `module`：sourcemap 生成时会关联每一步 loader 生成的 sourcemap，可以**映射回最初的源码**

理解了这些基础配置项，根据 `^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$` 的规律来进行组合，就可以实现各种需求下的 sourcemap 配置。

当然，这种 sourcemap 配置还不够细致，比如 sourcemap 的 url 怎么生成，文件名是什么。如果想对这些做配置，可以关掉 devtool，启用 `SourceMapDevToolPlugin` 来配置。

虽然 webapck 的 sourcemap 配置方式比较多，但最底层也就是**浏览器支持的文件级别的 `sourcemap`** 还有 **`eval`代码的`source`映射和`sourcemap`**这两种机制。其余的方式都是基于这两种机制的封装。

## 调试实际项目(Vue项目)
有的项目可以在Chrome DevTools中打断点调试，但是在VSCode Debugger中调试的话，发现断点没有生效(只读的)，这时候就可以自己映射一下，打个断点看看在 Chrome DevTools 里是什么路径，然后看看本地是什么路径，配置对应的映射就好了。

vue cli 创建的项目，默认情况下打断点不生效，这是因为文件路径后带了 ?hash，这是默认的 `eval-cheap-module-source-map` 的 devtool 配置导致的，去掉 eval，改为 source-map 即可。

create vue 创建的 vite 做为构建工具的项目 sourcemap 到的路径直接就是本地的路径了，更简单一些。但是会有一些文件被错误映射到源码的问题，需要设置下 webRoot。

## 断点映射原理
VSCode Chrome Debugger断点的映射原理
- 在本地文件打的断点会通过 CDP 传给 Chrome，如果路径和 sourcemap 到的文件匹配，那断点就能生效

>如果 `sourcemap` 到的文件路径不是本地路径，那就映射不到本地文件，导致断点打不上，这时候可以配置下 `sourceMapPathOverrides`。如果映射之后路径开头多了几层目录，那就要配置下 `webRoot`

## VSCode Snippets快速创建调试配置
快速创建调试配置，可以使用VSCode的Snippets(用户代码片段)
- `snippets`: 根据前缀快速填入一段代码片段

**语法**
- `$x`: 指定光标位置
- `$x $x`: 多光标编辑
- `${x:placeholder}`: 指定placeholder文本
- `${x|aaa,bbb|}`: 指定多选值
- `$VariableName`: 取变量
- `${VariableName/正则/替换的文本/}`: 对变量做转换

snippets有项目、语言、全局三种生效范围

## 调试NodeJS
nodejs如何进入调试
使用`node --inspect`或`node --inspect-brk`以调试模式跑node脚本，然后调试的UI连接上这个调试服务就可以进行调试了.

- `Chrome Devtools`调试
  - 谷歌浏览器地址栏输入:`chrome://inspect/#devices`
  - 点击inspect即可调试
- `VSCode Debugger`调试
**方式一：自己启动node调试服务,然后手动attach**
```bash
# 默认9229
node --inspect-brk=8888 ./index.js
```
配置调试文件，然后attach(`Node.js: Attach`)
```json
{
  "name": "Attach",
  "port": 8888,
  "request": "attach",
  "skipFiles": [
    "<node_internals>/**"
  ],
  "type": "node"
}
```
**方式二：launch类型配置，自动进行`Node.js: Launch Program`**
```json
{
  "name": "Launch Program",
  "program": "${workspaceFolder}/index.js",
  "request": "launch",
  "skipFiles": [
    "<node_internals>/**"
  ],
  "type": "node"
}
```

node 调试的协议也是用的 Chrome DevTools Protocol，就是为了能够复用 Chrome DevTools 的 UI 的，中间还有一段历史是用 node inspector 做中转。

## 调试npm scripts
命令行工具都是在 `package.json` 中声明一个 `bin` 字段，然后 `install` 之后就会放到 `node_modules/.bin` 下.

可以 `node node_modules/.bin/xx` 来跑，可以 `npx xx` 来跑，最常用的还是 `npm scripts`，通过 `npm run xx` 来跑.

`npm scripts` 的调试就是 node 的调试，只不过 VSCode Debugger 做了简化，可以直接创建 npm 类型的调试配置.

把 `console` 配置为 `integratedTerminal` 之后，日志会输出到 terminal，和平时直接跑 npm run xx 就没区别了。而且还可以断点看看执行逻辑

`Node.js: Launch via NPM`

## VSCode Node Debugger配置
**`attach`**
- `restart`: 当我们以`attach`方式启动时，需要连接ws调试服务(可能存在超时或失败的情况)，该配置可以重新连接
```json
// 1s重试一次，最多三次
"restart": {
  "delay": 1000,
  "maxAttempts": 3
}
```

- `attach by process id`
之前attach的方式是连接到端口，但其实还可以通过进程id进行连接.
```bash
# linux下查看进程id
lsof -i:9229
# window powershell查看进程id
netstat -ano|findstr "9229"
```
配置关键字`Node.js: Attach to Process`
默认值是 `${command: PickProcess}`,当我们点击调试，会弹出一个选中窗口，这时候选择查出来的那个进程即可.

**`launch`**
不需要手动启动node调试模式，只需要指定node程序地址即可
- `program & args`
  - `program`: node程序地址(代码路径)
  - `args`: 命令行参数

- `runtimeExecutable`: 默认是node，会从环境遍历中查找对名字的runtime启动
例子：使用`ts-node`
```bash
# 安装ts-node
npm install -g ts-node
# 调试配置中加入
{
  "runtimeExecutable": "ts-node"
}
```
- `skipFiles`: 默认值是`<node_internals>/**`
也就是跳过node内部的文件——这样做可以精简调用栈，只显示我们关心的部分

- `stopOnEntry`: 首行断住（和`--inspect-brk`一样的效果）

- `console`: 默认的debug模式下，打印日志是在console里。
  - `externalTerminal`: 系统的terminal
  - `integratedTerminal`: 内置的terminal(终端)面板
  - `internalConsole`: 默认的debug console面板

- `autoAttachChildProcesses`
node支持多进程，可以将一些脚本放到子进程来跑以提高性能.
该配置默认为true，即自动连接子进程的ws调试服务的接口，因此在子进程中的断点也可以生效
配置为false，会发现在子进程中的断点不会生效

- `cwd`(`current work directory`)当前工作目录
指定runtime在哪个目录运行，默认是根目录`workspaceFolder`

- `env`
node程序很多情况下是需要环境变量的，我们可以在配置中配置环境变量
```json
{
  "env": {
    "aaa": "gzdl-strive"
  }
}
```
当然也可以配置一个`envFile`来保存环境变量
```json
{
  "envFile": "${workspaceFolder}/.env"
}
```
两个配置同时存在是，会合并两个配置中的环境变量，env字段中配置的优先级高于envFile中的

- `presentation`
对存在多个配置的配置进行分组排序

## 调试代码可能遇到的9种作用域
- `Global作用域`: 全局作用域
- `Local作用域`: 本地作用域(函数内声明一个变量，调用这个函数时，就会生成)
- `Block作用域`: 块级作用域(`ES6`新增——例如if、while、for等都会生成)
- `Script`作用域(浏览器环境下用let|const声明的全局变量时的特殊作用域，可以直接访问该全局变量，但不能通过window.xx访问)
- `Catch Block作用域`: catch语句生成的特殊作用域，特点是能访问错误对象
- `With Block作用域`: with 语句会把传入的对象的值放到单独的作用域里，这样 with 语句里就可以直接访问了
- `Closure作用域`: 函数需要的外部变量保存在Closure作用域中. (eval 的闭包比较特殊，会把**所有变量**都保存到 Closure 作用域)
- `Module作用域`: package.json中指定`type: "module"`,这样就可以import、export以及使用顶层await等特性.(es module 模块运行的时候会生成 Module 作用域，而 commonjs 模块运行时严格来说也是函数作用域，因为 node 执行它的时候会包一层函数，算是比较特殊的函数作用域，有 module、exports、require 等变量)
- `Eval作用域`: eval 代码声明的变量会保存在 Eval 作用域

## 通过变量写出更灵活的调试配置
VSCode Debugger调试配置可以通过变量来增加配置的灵活性.

- input变量: 可以让用户输入或选择，通过`${input:xxx}`语法
- env变量: 可以读取环境变量值，通过`${env:xxx}`语法
- config变量: 读取VSCode的配置，通过`${config:xxx}`语法
- command变量: 读取命令执行结果，通过`${command:xxx}`语法
- 内置变量, 可以读取当前文件、目录等信息，通过`${xxx}`语法

## 打断点的7种方式
- 异常断点
- 条件断点(在代码左边打断点的地方右键单击选中条件断点)
- 日志消息断点(在代码左边打断点的地方右键单击选中日志消息)

**网页里专用的**
- DOM断点(Chrome DevTools中，在某个节点上右键 => Break on => 三种类型(子树修改时断住、属性修改是断住、节点删除时断住) => 刷新页面)
- Event Listener断点(Chrome DevTools的Source面板，可以找到事件断点，有各种类型事件)
- url请求断点(XHR/fetch Breakpoints)：当你想要在某个请求发送的时候断住，但你不知道在哪里发的，这时候就可以使用url请求断住.

加上普通打断点，一共有7种。这些类型的断点在特定条件下很有用.

## performance分析并优化性能
>`Chrome Devtools`的`Performance`工具是网页性能分析的利器，它可以记录一段时间内代码的执行情况，比如Main线程的Event Loop、每个Event Loop的Task、每个Task的调用栈、每个函数的耗时等，还可以定位到Sources中的源码位置(显示耗时)。

性能优化的目标是找到Task中的long task，然后消除它。因为网页的渲染是一个宏任务，和JS的宏任务在同一个Event Loop中，是相互阻塞的.

**优化步骤**
1. 通过performance分析出代码中的耗时部分，找到原因(例如计算量大导致阻塞)
2. 将计算逻辑拆分到worker线程以充分利用多核CPU的并行处理能力，消除主线程的long task

## 通过performance理解Event Loop
Performance工具能看到网页的Event Loop如何运行，不同颜色代表不同的含义
- 灰色: `task`
- 橙色: 浏览器内部的JS
- 蓝色: html parse
- 紫色: reflow、repaint
- 绿色: 渲染

其余颜色都是用户自己的JS

- 宽度代表执行时间，超过**`50ms`**就是长任务，需要优化.
- 长度代表了调用栈的深度，一般特别长的都是有递归在

以React的Fiber为例，通过performance分析出了很多东西
- RAF(RequestAnimationFrame)回调和reflow、repaint以及渲染构成一个宏任务，每隔16.67ms执行(域刷新率有关，比如60HZ, 1s / 60 = 16.67ms)一次
- RAF回调、RIC回调(RequestIdleCallback)、GC(垃圾回收)、HTML中的Script等都是宏任务.
- 在任务执行完后，浏览器回执行所有微任务，也就是runAllMicroTasks部分

>`Performace`可以看到代码的执行全貌，而断点调试的调用栈只能看到某一条流程。所以调试代码时可以通过Performace配合Debugger来使用.

## 通过performance理清异步顺序
通过 Performance 工具可以看到代码执行的 Event Loop，包括宏微任务、执行时间等。

- 可以看到`渲染`、`setTimeout`、`requestAnimationFrame` 等是**宏任务**。
- `Promise.then`、`MutationObserver` 是**微任务**。

## Web Vitals
Chrome定义了一系列性能指标，叫做`Web Vitals`

- `TTFB`: 首字节到达(从开始加载网页到接受到第一个字节的网页内容之间的耗时)
- `FP`: 首次绘制(第一个像素绘制到页面上的时间)
- `FCP`: 首次内容绘制(从开始加载网页到第一个文本、图像、svg、非白色的 canvas 渲染完成之间的耗时)
- `FMP`: 首次有意义的绘制（FMP 就是记录关键内容渲染的时间）
- `LCP`: 最大内容绘制（计算方式是从网页开始渲染到渲染完成，每次渲染内容都对比下大小，如果是更大的内容，就更新下 LCP 的值）
- `DCL`: DOM内容加载完成(html文档被完全加载和解析完之后，DOMContentLoaded 事件被触发，无需等待 stylesheet、img 和 iframe 的加载完成)
- `L`: 加载完成( html 加载和解析完，它依赖的资源（iframe、img、stylesheet）也加载完触发)
- `TTI(Time to Interactive)`: 可交互时间
  - 从 FCP 后开始计算
  - 持续5秒内无长任务（大于 50ms） 且无两个以上正在进行中的 GET 请求
  - 往前回溯至5秒前的最后一个长任务结束的时间，没有长任务的话就是FCP的时间
- `FID`: 首次输入延迟(用户第一次与网页交互（点击按钮、点击链接、输入文字等）到网页响应事件的时间)
- `TBT`: 阻塞总时长(记录在首次内容渲染（FCP）到可以处理交互（TTI）之间所有长任务（超过 50ms 的 longtask）的阻塞时间总和)
- `CLS`: 累计布局偏移(记录了页面上非预期的位移波动)
- `SI`: 速度指数(页面可见部分的显示速度, 单位是时间) 

**三个核心指标: `LCP`、`FID`、`CLS`**
分别用来衡量加载性能、交互性能、视觉稳定性

可以通过`Lighthouse`测试这些指标的值，Lighthouse灰给出分数和颜色标识，也会给出每个指标的优化建议.

有时需要自己计算并上报这些指标，可以通过`performance` api来算，或者通过`PerformanceObserver` api拿到计算后的指标值

## 使用Performance和Memory分析内存(上)
`console.log`会导致内存泄漏，也就是代码执行完了，还占据着一部分内存没有释放.

**其它导致内存泄漏的可能**
- 游离的`DOM`被变量引用
- 全局变量
- 变量被闭包引用
- 定时器没清除

通过使用`Performance`和`Memory`工具分析内存泄漏
- 先手动GC，然后执行一些操作，再GC,如果内存没有回到执行前，说明这段代码存在内存泄漏，可以通过使用performance定位到代码位置分析代码.
- Memory工具是从内存对象的角度分析，可以对操作进行两次快照，然后进行比对.（也可以实时监测内存占用情况）
  
我们可以使用logpoint代替console.log

## 使用Performance和Memory分析内存(下)
- `console.log`在devtools打开的时候是有内存泄漏的，因为控制台打印的是对象引用。但是不打开devtools是不会有内存泄漏的.

`string`因为常量池的存在，同样的字符串只会创建依次。`new String`的话才会在堆中创建一个对象，然后指向常量池种的字符串字面量.

nodejs打印的是序列化以后的对象，所以是没有内存泄漏的.

## Layers分析图层
页面的绘制是分成多个图层的，因为不同部分重绘频率不同，而且有的部分还是用的GPU渲染，所以网页用的是绘制在多个图层，然后合并的方式.

用 Performance 工具也可以分析出这个过程，而且可以看到专门用于图层合并的 Compositor 线程

Chrome DevTools 和 Safari DevTools 都有 Layers 工具，Safari DevTools 的更好用一些，可以显示中文的图层创建的原因.

如果你需要优化渲染的性能，就需要把一些高频绘制的区域移到单独的图层里，比如加 will-change 属性，这时候就可以通过 Layers 工具来分析了

## Chrome DevTools小功能
- `Replay XHR`: 重新发送请求，不用刷新页面(Network -> 具体某个接口 -> 右键 -> `Replay XHR`)
- 请求定位到源码: 想知道请求是在哪里发起的(Network -> 点击具体某个接口 -> 右侧initiator部分可以看到发请求的调用栈)
- 元素定位到创建的源码: 想知道某个元素的创建流程(Elements面板种选中某个元素，点击`Stack Trace`) => (该功能是实验性的，需要手动开启: settings => experiments => 勾选"Capture node creation stacks")
- `group by folder`: 网页加载的文件默认是按照域名和目录组织的，找文件时一层层找起来比较麻烦，可以切换为平铺的(Source => 左边三点(more options) => Group by folder)
- `Network`自定义展示列(Network -> 具体某个接口 -> 右键 -> `header options`选择需要展示的列)
- `Network`自定义展示响应header(Network -> 具体某个接口 -> 右键 -> `header options` -> `response headers`)
- `Network`展示请求响应的耗时(请求默认的waterfall列展示的是请求的时间) => (Network -> 具体某个接口 -> 右键 -> `header options` -> `response waterfall` -> `total Duration`)
- 代码手动管理sourcemap(source -> 右键 -> add source map -> 输入sourcemap的url就可以关联上)
- `filter`(请求比较多时，过滤)
  - 关键词搜索(只能根据url来过滤)
  - 过滤器
    - `has-response-header`: 过滤响应包含某个 header的请求
    - `method`: 根据 GET、POST 等请求方式过滤请求
    - `domain`: 根据域名过滤
    - `status-code`: 过滤响应码是 xxx 的请求，比如 404、500 等
    - `larger-than`: 过滤大小超过多少的请求，比如 100k，1M
    - `mime-type`: 过滤某种 mime 类型的请求，比如 png、mp4、json、html 等
    - `is`: 过滤某种状态的请求，比如 from cache 从缓存拿的，比如 running 还在运行的
    - `resource-type`: 根据请求分类来过滤，比如 document 文档请求，stylesheet 样式请求、fetch 请求，xhr 请求，preflight 预检请求
    - `cookit-name`: 过滤带有某个名字的 cookie 的请求
  - 输入`-`就会提示所有的过滤器，但这个减号需要去掉，它是非的意思(和右边的invert选项功能一样)
- `developer resources`: sourcemap在Network种看不到->被network过滤了(`customize adn devtools`(devtools扩展，三个点) -> `show console drawer` -> `Developer Resources`)
- `remove event listeners`(element面板选中元素可以看到当前元素以及祖先元素的所有事件监听器，可以在该面板中移除事件达到调试的作用)

## 通过Chrome Devtools调试了解B站视频播放
为什么B站、知乎视频播放速度快？

通过发送`range`请求动态请求视频的某个片段，然后通过`SourceBuffer`动态播放该片段.

range是提前确定好的，会根据进度条来计算下载哪个range的视频.

播放时，会边播放边加载后面的range，而调整进度时，也会从对应的range开始下载.

服务端存储视频片段的方式(B站使用m4s——分段存储的，知乎使用mp4动态读取文件的部分内容返回)

**调试过程**
- 通过`status-code`过滤出206状态码的请求
  - 范围响应使用`206(Partial Content)`
  - 请求范围如果不合法，返回`416(Range Not Satisfiable)`
  - 服务器允许忽略range首部，从而返回整个文件，状态码`200`
- 通过自定义展示列直接显示`Content-Range`
- 通过搜索功能搜索响应的内容(使用了SourceBuffer)

## 放弃console.log, 使用Debugger
`console.log`的弊端太多了，大对象打印不全，会超过 terminal 缓冲区，对象属性不能展开等等，不建议大家用。就算要打印也可以用 LogPoint

用 Debugger 可以看到调用栈，也就是代码的执行路径，每个栈帧的作用域，可以知道代码从开始运行到现在都经历了什么，而 console.log 只能知道某个变量的值

此外，报错的时候也可以通过异常断点来梳理代码执行路径来排查报错原因

但 Debugger 只能看到一条执行路径，可以用 Performance 录制代码执行的全流程，然后再结合 Debugger 来深入其中一条路径的执行细节

此外，只有调试最初的源码才有意义，不然调试编译后的代码会少很多信息。可以通过 SourceMap 来关联到源码，不管是 Vue、React 的源码还是 Nest.js、Babel 等的源码。