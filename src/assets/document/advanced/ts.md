## TypeScript简介
- 对某种类型只做该类型允许的操作，叫做**类型安全**
- 动态/静态类型检查
  - 动态类型检查: 运行时做，源码中不保留类型信息，写代码灵活，但类型也容易存在不安全的隐患.
  - 静态类型检查: 运行前的编译阶段做的, 源码中保留类型信息，声明变量要指定类型，会有专门的编译器在编译期间做检查.

- 支持类型编程的类型系统
>对传入的类型参数(泛型)做各种逻辑运算，产生新的类型，这就是类型编程.

## 类型
- 复用JS中的类型: `number`、`string`、`object`、`bigint`、`symbol`、`undefined`、`null`，以及它们的包装类型`Number`、`Boolean`、`String`、`Object`、`Symbol`、`Array`...
- TS中新增的三种复用类型: `Tuple(元组)`、`Interface(接口)`、`Enum(枚举)`

- `Tuple`: 元素个数和类型固定的数组类型`type Tuple = [number, string];`
- `Interface`: 描述函数、对象、构造器的结构(对象类型、class类型在TS中也叫做索引类型，也就是索引了多个元素的类型的意思.)
- `Enum`: 一系列值的复合

**特殊类型**
- `void`: 代表空，可以是 undefined 或 never
- `never`: 代表不可达，比如函数抛异常的时候，返回值就是 never
- `any`: 是任意类型，任何类型都可以赋值给它，它也可以赋值给任何类型（除了 never）。
- `unknown`: 是未知类型，任何类型都可以赋值给它，但是它不可以赋值给别的类型

**类型的装饰**
- 可选
- 只读
- ....

## 类型运算
- 条件类型`Conditional Type`: `extends ? :`
- 推导`infer`: 提取类型的一部分
- 联合`|`: 代表类型可以是几个类型之一
- 交叉`&`: 代表对类型做合并(**同一类型可以合并，不同类型会被舍弃**)
- 映射类型：相当于把一个集合映射到另一个集合
  - `keyof T`查询类型中的所有的索引，叫做**索引查询**
  - `T[Key]`取索引类型某个索引的值，叫做**索引访问**
  - `in`遍历联合类型的运算符
- 重映射`as`

>索引类型(对象、class等)可以用`string`、`number`和`symbol`作为key。`Key & string` => 相当于对联合类型`string | number | symbol`取交叉部分，只剩下string了.

## 类型体操套路
### 1、模式匹配做提取
>通过`extends`对类型参数做匹配，结果保存到通过`infer`声明的局部类型变量中，匹配成功就从该局部变量里拿到提取出的类型.

### 2、重新构造做变换
>TypeScript 类型系统支持 3 种可以声明任意类型的变量： `type`、`infer`、`类型参数`。 => 无法修改，需要做变换重新构造生成新类型.（想要变化就需要重新构造新的类型，并且可以在构造新类型的过程中对原类型做一些过滤和变换）
- `type`: 类型别名，声明一个变量存储某个类型
- `infer`: 类型提取，存到变量中，相当于局部变量
- `类型参数`: 接受具体的类型，也相当于局部变量

**`Uppercase`内置高级类型**
**`Record`内置高级类型来创建索引**

>数组、字符串、函数、索引类型等都可以用这种方式对原类型做变换产生新的类型。其中索引类型有专门的语法叫做映射类型，对索引做修改的 `as` 叫做重映射

### 3、递归复用做循环
>递归: 通过将问题拆解为一系列相似的小问题，通过调用函数自身来解决，直到满足特定条件，完成问题的求解。

- 处理数量(个数、长度、层数)不固定的类型。通过递归达到循环的效果.

### 4、数组长度做计数
>TS类型系统没有加减乘除运算符，通过数组(元组)类型的构造和提取，取长度(`length`)来实现数值运算.

### 5、联合分散可简化
>分布式条件类型：类型参数为联合类型且在条件类型的左边直接引用该类型参数时，TS会将联合类型的每一个元素单独传入来做类型运算，最后再合并成联合类型.

- 联合类型遇到字符串时的处理也是分布式的

- `A extends A`取出联合类型中的单个类型放入A
- `[A] extends [A]`不是分布式

### 6、特殊特性要记清
- `any`类型与任何类型的交叉都是`any`，也就是`1 & any`结果是`any`.——可用于判断any类型
- 联合类型作为条件类型左边的类型参数传入时，会触发分布式
- `never`作为条件类型左边的类型参数传入时，直接返回never
- `any`作为条件类型左边的类型参数传入时，直接返回`trueType`和`falseType`的合并
- 元组类型的length是数字字面量，数组的length是number
- 类型之间的父子关系，更具体的那个是子类型，比如A和B的交叉类型`A & B`就是联合类型`A | B`的子类型。
  - **逆变**: 允许父类型赋值给子类型
  - **协变**: 允许子类型赋值给父类型
- 函数参数逆变性质，参数是多个类型，参数类型会变成它们的交叉类型(一般就用于联合类型交叉类型)
- 可选索引的值为`undefined`和值类型的联合类型
- 索引签名(`[key: string]: any;`)不能构造成字面量类型，因为它没有名字，而其它所有可以.
- `keyof`只能拿到`class`的`public`索引，`private`和`protected`的索引会被忽略
- `const`是常量的意思，也就是这个变量首先是一个字面量值，而且还不可修改，有字面量和`readonly`两重函数。所以加上`as const`会推导出readonly的字面量类型.

## TS内置高级类型
- `Parameters`: 提取函数类型的参数类型
- `ReturnType`: 提取函数类型的返回值类型
- `ConstructorParmeters`: 提取构造器类型的参数类型
- `InstanceType`: 提取构造器类型的返回值类型
- `ThisParameterType`: 提取this类型
- `OmitThisParameter`: 删除this类型
- `Partial`: 索引类型变为可选
- `Required`: 索引类型变为必选（去掉可选-?）
- `Readonly`: 索引类型变为只读
- `Pick`: 提取部分索引构造新索引类型
- `Omit`: 去掉部分索引构造新索引类型
- `Record`: 创建索引类型
- `Exclude`: 从一个联合类型中去掉一部分类型——取差集
- `Extract`: 从一个联合类型中取出相同的类型——取交集
- `Awaited`: 提取Promise的ValueType
- `NonNullable`: 判断是否为非空类型(不为null和undefined)
- `Uppercase`: 大写
- `Lowercase`: 小写
- `Capitalize`: 首字母大写
- `Uncapitalize`: 首字母小写

**其它知识点**
- `keyof any => string | number | symbol(配置中开启keyOfStringsOnly => string)`
- `intrinsic`: 固有的意思，就像js中有的方法会打印`[native code]`一样。这部分类型不是在TS中实现的，而是编译过程中由js实现(因为解析类型需要处理AST，性能比较差，直接用js计算更快)

## 类型编程的意义
>需要动态生成类型的场景，必然要用类型编程做一些运算。有的场景下可以不用类型编程，但是用了能够有更精准的类型提示和检查。

- ` unknown[] | []`: ts里有个 `as const` 的语法，加上之后，ts 就会推导出常量字面量类型，否则推导出对应的基础类型.

>约束为 `unknown[] | []` 就是 `as const` 的意思
```ts
declare function ttt<T extends readonly unknown[]>(values: T): T;
// const res: number[]
const res = ttt([1, 2, 3]);

declare function ttt2<T extends readonly unknown[] | []>(values: T): T;
// const res2: [number, number, number]
const res2 = ttt2([1, 2, 3]);
```
类型参数 T 是通过 js 函数的参数传入的，然后取 `typeof`

## 类型实战
- `keyof any`取当前索引支持哪些类型的
  - 不开启StirngKeyxxxx配置项: `keyof any ====> string | number | symbol`
- TS类型只有在用到的时候才会计算，我们可以通过一层映射，构造新索引类型

**函数重载的三种写法**
```ts
// 1、declare声明多个同名函数类型
declare function func(name: string): string;
declare function func(name: number): number;

// 2、interface声明多个函数签名
interface CP {
  (name: string): string;
  (name: number): number;
}
declare const cp2: CP;

// 3、取交叉类型——声明交叉类型
type CP2 = ((name: string) => string) & ((name: number) => number);
declare const cp3: CP2;
```

- 之前学过联合类型转交叉类型(利用**函数逆变**的性质)
- 函数重载又可以通过交叉类型来写
- 重载函数的`ReturnType`返回的是最后一个重载的返回值类型
- 这样我们就能获取到联合类型的最后一个类型

>**提取重载函数的返回值会返回最后一个返回值类型**

## infer extends
- 问题：从string数组中提取的元素，默认会推导为unkndown类型，导致我们不能直接将它当成string用
- TS(4.7)新增语法——`infer 后面加上extends来约束推导的类型，这样推导出的就不再是unknown了，而是约束的类型`
- `infer extends`还可以用来做类型转换

## 原理篇：协变、逆变、双向协变、不变
- TS为了增加类型系统灵活性，设计了父子类型的概念。父子之间自然应该能赋值，也就是会发生**型变(`variant`)**。
- 型变分为协变和逆变
  - 协变(`covariant`): 子类型赋值给父类型
  - 逆变(`contravariant`)：父类型赋值给子类型（主要是函数赋值时函数参数的性质）
    - 参数的父类型可以赋值给子类型，这时因为按照子类型来声明的参数，访问父类型的属性和方法自然没问题，依旧是类型安全的。
- ts2.x之前，既可以逆变也可以协变，叫做双向协变.
- ts通过`strictFunctionTypes`编译选项，开启后函数参数就只支持逆变，否则支持双向协变。
- 型变是针对父子类型来说的，非父子类型自然就不会型变也就是不变(`invariant`).
- 如何判断父子类型：ts中是根据**结构**来看的，**更具体的那个就是子类型**.

## 原理篇: bable和tsc
babel和tsc的编译流程大同小异，都有将源码转为AST的Parser, 都会做语义分析(作用域分析)和AST的transform, 最后都会用Generator(或者Emitter)将AST打印成目标代码并生成 sourcemap。但是 babel 不做类型检查，也不会生成 d.ts 文件。

- tsc 支持最新的 es 标准特性和部分草案的特性（比如 decorator），而 babel 通过 @babel/preset-env 支持所有标准特性，也可以通过 @babel/proposal-xx 来支持各种非标准特性，支持的语言特性上 babel 更强一些。
- tsc 没有做 polyfill 的处理，需要全量引入 core-js，而 babel 的 @babel/preset-env 会根据 targets 的配置按需引入 core-js，引入方式受 useBuiltIns 影响 (entry 是在入口引入 targets 需要的，usage 是每个模块引入用到的)。
- 但是 babel 因为是每个文件单独编译的（tsc 是整个项目一起编译），而且也不解析类型，所以 const enum（后来支持了），namespace 合并，namespace 导出非 const 值并不支持。而且过时的 export = 的模块语法也不支持。
- 但这些影响不大，完全可以用 babel 编译 ts 代码来生成体积更小的代码，不做类型检查编译速度也更快。如果想做类型检查可以单独执行 `tsc --noEmit`。

## 原理篇：实现简易TypeScript
类型检查就是做 AST 的对比，判断声明的和实际的是否一致：
- 简单类型就直接对比，相当于 if else
- 带泛型的要先把类型参数传递过去才能确定类型，之后对比，相当于函数调用包裹 if else
- 带高级类型的泛型的类型检查，多了一个对类型求值的过程，相当于多级函数调用之后再判断 if else

## TS特殊情况的说明
- 两个条件类型判断相关性时，会判断右边部分是否相等.`T1 extends U1 ? X1 : Y1`和`T2 extends U2 ? X2 : Y2`相关的话，那么`T1和T2`相关，`X1和X2`相关，`Y1和Y2`相关，而`U1和U2`**相等**.
- 类型编程中如果需要取类型参数做一些计算时，默认推导出来的是约束的类型，如果没有类型约束，就为unknown.
- 条件类型特殊情况
  - 联合类型作为类型参数出现在条件类型左侧时，会将联合类型中的每个类型单独传入，并将结果合并为联合类型
  - boolean也是联合类型,`true | false`
  - `any`作为条件类型左边的类型参数传入时，直接返回`trueType`和`falseType`的合并
  - - `never`作为条件类型左边的类型参数传入时，直接返回never

## 3种类型来源和3种模块语法
>我们可以给自己写的代码添加类型，但不是我们写的呢？比如JS引擎提供的Number、String、Date，浏览器提供的HTMLElement、Event等API, 我们在代码中也会用到它们，如何给这些API添加类型呢?

- TypeScript 给 JavaScript 添加了类型信息，在编译时做类型检查。
- 除了在变量声明时定义类型外，TS 也支持通过 `declare` 单独声明类型。**只存放类型声明**的文件后缀是`d.ts`。

- TS的3种存放类型声明的地方
  - `lib`: 内置的类型声明，包含DOM和es的，因为这两是有标准的.
  - `@types/xxx`: 其它环境的api类型声明，比如node，还有npm包的类型声明
  - `开发者写的代码`: 通过include + exclude还有files指定

- TS声明模块的3种方式
  - `namespace`: 最早的实现模块的方式，编译为声明对象和设设置对象的属性的JS代码.
  - `module`: 和namespace的AST没有什么区别，只不过一般用来声明CommonJS的模块，在@types/node下有很多
  - `es module`: es标准的模块语法，ts额外扩展了import type

```ts
// 在全局上放一个对象，然后在对象上挂载几个需要暴露出去的属性.
namespace Gzdl {
  export interface Person {
    name: string;
    age: Number;
  }

  export function add(a: number, b: number): number {
    return a + b;
  }
}

module "fs/xxx" {
  //...
}

// es module
import 
export 
import type
```

**`d.ts`**
- `d.ts`类型声明默认是全局的，除非有es module的import、export声明，这时候就需要手动`declare global`。为了避免这种写法，可以用`reference`的编译器指令.

```ts
// 全局
declare const func: (a: number, b: number) => number;

// 局部
import xxx from "yyy";
declare const func: (a: number, b: number) => number;

// 全局
import xxx from "yyy";
declare global {
  const func: (a: number, b: number) => number;
}

// 引入模块，也需要全局声明类型的另一种方式
/// <reference types="nodes">
declare const func: (a: number, b: number) => number;
```

**学习类型定义是怎么给 JS 加上类型，学习类型编程是怎么动态生成类型和对类型做修改，这些类型可能会通过模块或全局的方式来组织，所以还需要学习模块语法，而且可能会放在 `lib、@types/xxx`、用户目录等位置，还要学习不同来源的类型的查找机制。**

## Project Reference优化编译性能
如果项目下有一些相对独立的模块，别的模块的变动不影响它，但是它却要跟着重新编译一次，这时就可以用 `Project Reference` 来优化了

在独立的模块下添加 `tsconfig.json`，加上 `composite` 的编译选项，在入口的 `tsconfig.json` 里配置 `references` 引用这些独立的模块。然后执行 `tsc --build` 或者 `tsc -b `来编译。

原理是编译时会生成 `tsconfig.tsbuildinfo` 的文件，记录着编译的文件和它们的 `hash`，当再次编译的时候，如果文件 `hash` 没变，那就直接跳过，从而提升了编译速度。

## TS实践
- 第一层实现js逻辑，用递归或循环都可以实现
- 第二层给函数加上类型，用function声明类型和interface声明函数类型两种方式都可以。
- 第三次用类型编程实现精确的类型提示，这一层需要拿到参数的类型，通过提取元素的类型并构造出新的数组类型返回。还需要通过函数重载的方式来声明类型，并且要注意重载的声明顺序.

>`as const`能够让字面量推导出字面量类型，但会带有readonly修饰符，可以写映射类型来去掉修饰符.

> 其实这也是我们学习 ts 的顺序，**我们先要能把 js 逻辑写出来，然后知道怎么给函数、class 等加 ts 类型，之后学习类型编程，知道怎么动态生成类型。**

## satisfies: 用声明or用推导
- TS包括自动推导出的类型以及手动声明的类型两种

大多数时候使用自动推导就行，但是项函数参数，需要约束的变量类型等情况下就得手动推导了。

有的时候还是自动推导出的类型更合适一些，但是还需要通过声明的方式对其中的类型做约束

ts新增的`satisfies`(ts4.9)语法，可以使用自动推导出的类型，也可以加上类型约束.

>算是融合了自动推导的类型和手动声明的类型的优点(但是通过`satisfies`推导的类型中如果有可索引签名的话，动态新增就会失效)

**下载指定npm包的版本**
例如下载最新typescript版本包，beta
```bash
npm install typescript@beta
```
`@beta`是指定标签的意思。例如`@latest`也是标签
我们可以通过`npm dist-tag ls [package]`查看npm包的所有tag: 
```bash
xxxxx ts % npm dist-tag ls typescript
beta: 5.2.0-beta
dev: 3.9.4
insiders: 4.6.2-insiders.20220225
latest: 5.1.6
next: 5.2.0-dev.20230730
rc: 5.1.1-rc
tag-for-publishing-older-releases: 4.1.6
```
`npm install typescript`下在不了beta版本的包，它下载的是`latest`对应的版本。

**如何打上这个tag？**
发包的时候用的是`npm publish`，这样会自动打上`latest`的tag.
也可以手动`npm  publish --tags beta`，这样就能打上`beta`的tag了。

我们也可以通过`npm dist-tag`命令给某个版本的包打上tag
```bash
npm dist-tag add <package-spec (with version)> [<tag>]
npm dist-tag rm <package-spec> <tag>
npm dist-tag ls [<package-spec>]
```

## TS总结篇
- TypeScript入门: 给JS添加类型，例如函数，class、构造器、对象等。
- TypeScript进阶: 类型编程

>我们首先需要明确什么是类型安全，TypeScript添加的静态类型系统就是为了保证类型安全的，把一些类型不兼容的错误提前到编译期检查出来，提高代码健壮性。

>然后学了TS类型系统中的类型和支持的类型计算，大部分类型和JS中操持一致，只不过扩展了interface、enum、元组等复合类型，以及never、any、void等特殊类型.

>后面我们分别讲学了模式匹配（各种类型通过 infer 提取某部分类型）、重新构造（类型是不可变的，想修改只能重新构造一个新的。最主要的是通过映射类型来生成新的索引类型）、递归（类型编程里涉及到数量不确定的问题，要条件反射的想到用递归来解决）、数组长度计数（严格来说是元组长度，通过构造不同元素个数的元组再取长度的方式实现计数）、联合类型的分发特性（分布式条件类型，当联合类型作为类型参数出现在条件类型左边的时候触发），以及一些特殊的类型逻辑的讲解

>然后就是学习了TS的内置高级类型

>并且我们还通过几个例子感受了下类型编程的意义：**可以对已有类型做修改，可以动态生成一些类型，可以做更精准的类型检查和提示**

>之后学习了一些原理，包括协变、逆变、双向协变、不变等概念. 又对比了babel和tsc编译ts代码的区别. 然后就是如何阅读源码以及通过vscode调试.