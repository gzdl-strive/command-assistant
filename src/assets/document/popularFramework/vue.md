## Vue2响应式原理
通过ES5的API `Object.defineProperty()`对数据对象进行递归劫持，将每个属性转为`getter`/`setter`对形式，并为此创建一个跟踪依赖的系统。当我们访问/修改数据时，进行依赖的收集和派发更新，以保证视图和数据的同步.

对数组是通过重写数组方法，在重写的方法中进行数据劫持

**具体的代码实现**
- `observe`：观察者函数，传入一个数据对象，如果该对象已经是响应式的，直接返回，否则调用Observer(将该对象转为响应式的)，创建实例并返回.
- `Observer`: 将传入的对象/数组做相应的处理，转为响应式的
- `defineReactive`: 对属性进行数据劫持，如果该属性也是一个对象，则进行递归处理，使用`Object.defineProperty`对属性进行劫持，在访问该属性时进行依赖收集(使用依赖容器`Dep`实例(每个属性都有专用依赖容器)收集`Watcher`实例)，修改时进行派发更新(对应的依赖容器的所有Watcher实例都重新更新).
- `Dep`: 依赖容器，用于收集依赖和派发更新, `depend`方法用于收集依赖, `notify`派发更新
- `Watcher`: 依赖(也可称为副作用)，当我们使用一个响应式数据时，就会产生对于的副作用. 响应式数据修改时，就会重新执行一次副作用.
- `重写数组相关方法`: `Object.defineProperty`对数组的监听不太理想(从性能方面)，仅对数组方法进行数据劫持, 通过一个中间实例对象，该对象的原型执行数组原型，在该对象上添加方法进行劫持.(还可以访问到数组原型上的方法)

- `observe`函数
```js
import Observer from "./Observer.js";
/**
 * 返回传入对象的Observer实例
 * @param {Object} obj 被检查对象
 * @returns 对象的Observer实例 
 */
function observe(obj) {
  // 不是对象直接返回, 不需要转为响应式
  if (!isObject(obj)) {
    return;
  }
  // 如果对象上已经存在了__ob__属性，说明obj已经时响应式对象，直接返回它的__ob__属性
  // 而且__ob__还可以帮助我们对数组进行响应式依赖的收集
  if (obj.__ob__ && obj.__ob__ instanceof Observer) {
    return obj.__ob__;
  } else {
    // 如果obj不是响应式对象，那么为其创建Observer实例
    const ob = new Observer(obj);
    return ob;
  }
}
function isObject(data) {
  return typeof data === "object" && data !== null;
}
export default observe;
```
- `Observer`实例
```js
import Dep from "./Dep.js";
import defineReactive from "./defineReactive.js";
import observe from "./observe.js";

// 对数组添加响应式，采用重写数组原型方法（不改变原来的原型对象）
const original = Array.prototype;
// 基于数组原型创建的一个新对象，该对象的原型指向数组原型
// 我们通过给这个对象添加方法达到重写目的，同时还可以访问到数组原来的方法
const arrayMethods = Object.create(original);

Array.from(["pop", "push", "shift", "unshift", "splice", "sort", "reverse"]).forEach(method => {
  // 缓存原始方法
  const originalMethod = original[method];
  // 方法增强
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args) {
      // 通过__ob__获取dep容器
      this.__ob__.dep.notify();
      // 执行原始操作
      return originalMethod.call(this, ...args);
    },
    enumerable: false,
    writable: true,
    configurable: true,
  });
});

// 检查__proto__是否可用
const hasProto = "__proto__" in {};
// 获取所有Key(包括不可枚举的)
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

// 原型替换
const protoAugment = (target, source) => {
  // console.log("完成原型替换");
  // 完成原型替换，将目标数组的原型执行source(即我们重写的arrayMethods上)
  target.__proto__ = source;
}
// 手动添加重写的方法
const copyAugment = (target, source, sourceKeys) => {
  sourceKeys.forEach(key => {
    Object.defineProperty(target, key, {
      value: source[key],
      enumerable: false,
      writable: true,
      configurable: true,
    });
  })
}

class Observer {
  constructor(data) {
    this.value = data;
    // 创建依赖容器
    this.dep = new Dep();
    // 保存Observer实例
    const ob = this;
    this.def(data, "__ob__", ob);

    // 判断是否是数组
    if (Array.isArray(data)) {
      // 支持__proto__，直接原型替换
      if (hasProto) {
        protoAugment(data, arrayMethods);
      } else {
        // 不支持，就直接给数组添加增强后的方法
        copyAugment(data, arrayMethods, arrayKeys);
      }
      // 遍历数组，依次进行监测
      this.observeArray(data);
    } else {
      // 不是数组，那就是对象 => 按之前的逻辑处理，遍历key
      this.walk();
    }
  }
  /**
   * 为传入的监测对象添加__ob__属性，表示已经经过Observer实例化过，是一个响应式对象了
   * @param {Object} obj 需要监测的对象
   * @param {String} key 用来表示经过监测的属性
   * @param {Observer {}} value Observer实例
   */
  def(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }
  /**
   * 遍历需要监测的对象，一一调用defineReactive，对其进行数据劫持
   */
  walk() {
    Object.keys(this.value).forEach(key => {
      defineReactive(this.value, key, this.value[key]);
    });
  }
  /**
   * 对数组进行监测
   * @param {Array<any>} array 
   */
  observeArray(array) {
    for (let i = 0; i < array.length; i++) {
      observe(array[i]);
    }
  }
}

export default Observer;
```
- `defineReactive`函数
```js
import Dep from "./Dep.js";
import observe from "./observe.js";

function defineReactive(obj, key, value) {
  // 为每个属性绑定专有依赖容器
  const dep = new Dep();
  // childOb的值是Observer实例, 将该值也转为响应式的, 递归
  const childOb = observe(value);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 执行容器的depend进行依赖收集
      dep.depend();
      if (childOb) {
        childOb.dep.depend();
      }
      return value;
    },
    set(newVal) {
      // 新旧值相等，不进行操作
      if (value === newVal) return;
      console.log("设置值: ", newVal);
      // 执行容器的notify进行派发更新
      dep.notify();
      value = newVal;
    }
  })
}

export default defineReactive;
```
- `Dep`类
```js
import Watcher from "./Watcher.js";

// 依赖容器
class Dep {
  constructor() {
    // 我们的容器, 收集的watcher实例就放在这里
    this.subs = [];
  }

  // 依赖收集, 用track似乎更贴切一点
  depend() {
    // 如果window.target上保存了Watcher实例，就进行收集
    if (window.target && window.target instanceof Watcher) {
      this.subs.push(window.target);
    }
  }
  // 派发更新: 数据改变，通知依赖容器中的watcher实例
  // 使用trigger似乎更贴切一点
  notify() {
    // 遍历subs，依次通知里面watcher实例，触发它上面的更新方法
    this.subs.forEach(watcher => {
      watcher.update();
    });
  }
}

export default Dep;
```
- `Watcher`类
```js
class Watcher {
  constructor(obj, key, cb) {
    this.obj = obj;
    this.key = key;
    // 回调函数，更新视图时的具体方法
    this.cb = cb || null;
    // 触发依赖收集
    this.get();
  }
  get() {
    // 将watcher实例挂载到window.target属性上
    // 也可以挂载到Dep类上
    window.target = this;
    // 调用数据，触发getter
    this.oldValue = this.obj[this.key];
    // 调用完毕后释放window.target
    window.target = null;
  }
  update() {
    const newVal = this.obj[this.key];
    if (this.cb && typeof this.cb === "function") {
      this.cb(newVal);
    } else {
      console.log(`${this.key}的内容发生更新了, 从${this.oldValue}更新为${newVal}`); 
    }
  }
}

export default Watcher;
```

**测试一下**
>这里我们通过手动observe和Watcher来模拟，真实的源码中还包含模版编译等一系列操作自动来解析（编译阶段进行语法解析，进行自动实例Watcher，从而进行依赖收集），这里简化一下，仅通过手动触发生成响应式对象和手动进行依赖收集.
```js
import observe from "./observe.js";
import Watcher from "./Watcher.js";

const obj = {
  son: {
    name: "gzdl-strive"
  },
  test: "aaa",
  hobby: ["12323", {
    name: "value"
  }]
};
// 调用observe将该对象转为响应式对象
observe(obj);

// 调用响应式属性，就会生成一个watcher实例，这里我们手动触发一下
new Watcher(obj.son, "name", , (newVal) => {
  if (!document.querySelector(".son-name")) return;
  document.querySelector(".son-name").textContent = newVal;
});
obj.son.name = "999";
new Watcher(obj, "test");
obj.test = "bbb";
obj.test = "888";

new Watcher(obj, "hobby");
obj.hobby.push("456");
obj.hobby.pop();
```

![vue2](/vue2-responsive.jpg)

**问题**
- 对象属性的新增或者删除检测不到
解决办法：
  - 新增：提前声明/调用Vue.Set(vm.$set)
  - 删除：调用Vue.delete(vm.$delete)

- 数组直接通过索引设置一个数组项无法检测
- 直接修改数组长度时无法检测 => `使用Vue.set(vm.$set)` 或者 使用重写后的数组原型方法

**设计模式**
- 观察者模式
  - 观察者(订阅者)-`Watcher`
  - 目标(发布者)-`Dep`知道观察者的存在

>观察者模式由具体的目标调度，当事件触发，Dep(发布者)就会去调用观察者方法，所以观察者模式的订阅者和发布者之间存在依赖关系.

而发布/订阅模式由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在，隔离两者且减少两者之间的关系

- 发布订阅模式
  - 订阅者
  - 发布者
  - 信号中心（注册事件、触发事件）
订阅者通过在信号中心'注册事件'， 发布者通过发布信号触发信号中心的'触发事件'。让订阅者接收到触发信息（**Vue中自定义事件使用的就是发布订阅模式**）

## Vue3响应式原理
Vue3的响应式设计可分为两种：
- `ref`: 基础数据类型的响应式，使用`get/set`存取器实现响应式
- `reactive`: 引用数据类型的响应式，使用`Proxy`配合`Reflect`实现的响应式

**reactive响应式**
![reactive](/vue3-reactive.jpg)

```js
/*
  响应式数据：触发者
  effect副作用函数(响应者)：一个函数引用了外部的资源，这个函数就会受到外部资源改变的影响 => 这个函数存在副作用，也将该函数称为副作用函数
  dep: 副作用集合，去重
  depsMap: 依赖图，key为对象的属性(副作用所引用的响应式数据属性), value为副作用集合(多个副作用引用了同一个属性)
  targetMap: 存储多个对象，key为对象，值为对应对象的依赖图
*/

// 判断是否是一个对象
function isObject(target) {
  return typeof target === "object" && target !== null;
}
// 判断key是否存在
function hasOwn(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

// reactive
function reactive(target) {
  // 首先判断是否是一个对象
  if (!isObject) return target;

  // 处理程序对象：可以定义捕获器(trap), 捕获器就是“基本操作拦截器”
  const handler = {
    // 所有的捕获器方法都有同名的反射(Reflect)API方法

    // get捕获器参数：目标对象、要查询的属性、代理对象
    // 返回值无限制
    get(target, key, receiver) {
      console.log(`获取对象属性${key}值`);
      // 依赖的收集
      track(target, key);

      const result = Reflect.get(target, key, receiver);
      // 判断是否是一个对象，如果是，需要递归进行响应式处理
      if (isObject(result)) {
        return reactive(result);
      }
      return result;
    },
    // 和get捕获器参数差不多，多了一个要赋给属性的值
    // 返回值为布尔值，true成功，false失败
    set(target, key, value, receiver) {
      console.log(`设置对象属性${key}的值为: ${value}`);

      // 首先获取旧值
      const oldValue = Reflect.get(target, key, receiver);

      let result = true;
      // 判断新旧值是否相等
      if (oldValue !== value) {
        // 更新为新值
        result = Reflect.set(target, key, value, receiver);
        // 派发更新
        trigger(target, key);
      }
      return result;
    },
    // deleteProperty捕获器
    // 返回值为布尔值，true表示删除成功，false表示删除失败
    deleteProperty(target, key) {
      console.log(`删除对象属性${key}`);
      
      // 先判断是否有key
      const hasKey = hasOwn(target, key);
      const result = Reflect.deleteProperty(target, key);
      
      if (hasKey && result) {
        // 派发更新
        trigger(target, key);
      }
      return result;
    }
  };

  // Proxy接收两个参数：目标对象和处理程序对象。
  return new Proxy(target, handler);
}

// activeEffect 用于表示当前是否有正在走的effect(副作用)
let activeEffect = null;
/**
 * 注册副作用函数
 * @param {function} callback 需要注册的副作用函数
 * @returns 无
 */
function effect(callback) {
  if (typeof callback !== "function") return;
  // 记录正在执行的副作用函数
  activeEffect = callback;
  // 执行 => 依赖收集
  callback();
  // 重置
  activeEffect = null;
}

// targetMap 里面的每一个key都是一个普通对象，对于它们的depsMap
let targetMap = new WeakMap();

// 收集依赖-track
function track(target, key) {
  // 如果当前没有effect就不需要跟踪
  if (!activeEffect) return;
  // 获取当前对象的依赖图
  let depsMap = targetMap.get(target);
  // 如果不存在，就新建
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  // 根据key 从 依赖图中获取到 effect集合(副作用集合)
  // 副作用可能存在重复，集合天生就有去重功能
  let dep = depsMap.get(key);
  // 如果不存在，就新建
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  // 判断当前effect存在于集合中，不存在才添加进去
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
  }
}

// 派发更新-trigger
function trigger(target, key) {
  // 根据target 获取依赖图
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    // 没有需要触发的依赖图，直接return
    return;
  }
  // 从 依赖图 中根据 key 获取 effect集合
  const dep = depsMap.get(key);
  if (!dep) return;
  // 遍历effect集合，依次执行副作用函数
  dep.forEach(effect => {
    effect(target[key]);
  });
}
```

**`ref`和`reactive`响应式区别**
- `ref`：把一个基础类型包装成一个有`value`响应式对象（使用`get/set`存取器，来进行追踪和触发），如果是普通对象就调用 `reactive` 来创建响应式对象
- `reactive`：返回proxy对象，这个reactive可以深层次递归，如果发现子元素存在引用类型，递归reactive处理

**`Object.defineProperty` 和 `get/set` 存取器的区别**
- `Object.defineProperty`是一个较低级别的操作，它只能用于单个属性，并且需要显式地定义每个属性的描述符. 这在大量属性定义时可能会显得冗长和繁琐。因此，在 ES6 之后，通常更推荐使用`get/set` 存取器来创建访问器属性

**为什么要使用Reflect**
- `Reflect`是ES6出现的新特性，代码运行期间用来设置或获取对象成员，代替原始的操作，更加安全、语义化

**问题**
- 直接修改length、将数组索引大于数组的length不会触发响应式

>[文章来自于掘金，作者：爱吃糖的猫](https://juejin.cn/post/7285719262961565752?searchId=2023100811333688DC8E76578682E36886#heading-0)