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


