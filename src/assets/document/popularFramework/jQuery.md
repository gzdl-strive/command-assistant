> jQuery源码解析
> 实现一个乞丐版jQuery

## 基本结构
- IIFE立即执行函数
- 严格模式
- factory工厂函数
- global环境，上下文(这里仅处理window)

```js
(function (global, factory) {
  "use strict";
  factory(global);
})(window, function (window) {
  "use strict";

  let version = "0.0.1",
   jQuery = function (selector) {
    //...
   };

  window.jQuery = window.$ = jQuery;
});
```

>挂载jQuery到全局下，并起个别名`$`

## 初始化
>jQuery对象的初始化，调用init函数
>`jQuery.fn`和`jQuery对象`指向同一个原型（自己构造一个原型对象，并将该原型对象的constructor指向jQuery）
>任何在`jQuery.fn`上实现的函数(方法)其实主要都是调用jQuery对象上的方法. ——`jQuery.fn`就是jQuery方法的集合.
>创建`rootjQuery`对象：作用是让`jQuery.find()`和`jQuery.ready()`函数可以级联使用，减少参数的传递

```js
jQuery = function (selector) {
  // jQuery对象实际上只是“增强”的init构造函数
  // 只要调用jQuery，就需要init
  return new jQuery.fn.init(selector);
}

jQuery.fn = jQuery.prototype = {
  // 当前jQuery版本
  jquery: version,
  // 将原型指向正确的构造函数
  constructor: jQuery,
  // jQuery object默认长度为0
  length: 0
};

// 根jQuery(document)的中心引用
let rootjQuery,
  init = jQuery.fn.init = function (selector) {
    let match, elem;

    if (!selector) {
      return this;
    }

    if (selector.nodeType) {
      // 处理$(DOMElement) 例如$(document)
      this[0] = selector;
      this.length = 1;
      return this;
    }
  }

// 为init函数提供jQuery原型，以便稍后实例化
init.prototype = jQuery.fn;

// 初始化中心引用
rootjQuery = jQuery(document);
```

## extend扩展
>extend函数用于将一个或多个对象的内容合并到目标对象

```js
// 简陋版，只处理仅有一个参数，且是一个对象的情况
jQuery.extend = jQuery.fn.extend = function () {
  let options, copy,
    target = arguments[0] || {},
    length = arguments.length;

  // 不为对象或者长度不为1，直接return
  if (typeof target !== "object" || length !== 1) {
    return;
  }

  // 修改target为this（jQuery || jQuery.fn）    
  target = this;

  // 仅处理非null的值
  if ((options = arguments[0]) !== null) {
    // 扩展基本对象
    for (name in options) {
      copy = options[name];

      // name为__proto__可能会造成target的prototype被修改，所以直接跳过，不做处理——（防止Object.prototype污染）
      // target === copy相等，可能会造成无限引用的情况，所以也不做处理(防止无休止的循环)
      if (name === "__proto__" || target === copy) {
        continue;
      }

      //* 先忽略deep
      if (copy !== undefined) {
        target[name] = copy;
      }
    }
  }

  return target;
}
```

## find方法
>在jQuery对象中查找与指定选择器匹配的元素

- 源码中使用了Sizzle这个库的源码，我们这边仅通过`querySelectorAll`来查找
```js
jQuery.find = function (selector, result) {
  const selectorList = document.querySelectorAll(selector);
  for (let i = 0; i < selectorList.length; i++) {
    result[i] = selectorList[i];
    result['length']++;
  }
}
```

## 处理选择器
- 通过`$`或`jQuery`传入选择器，会调用init函数，在Init函数中进行选择器匹配分别处理(传入的选择器为**字符串**时)
  1. 处理HTML标签——暂时不做处理
  2. 处理ID选择器——通过`document.getElementById`
  3. 处理非上面两种类型的选择器——通过find方法
```js
init = jQuery.fn.init = function (selector, context, root) {
  //...

  root = root || rootjQuery;

  // 处理html string选择器
  if (typeof selector === "string") {
    if (selector[0] === '<' && 
      selector[selector.length - 1] === '>' && 
      selector.length >= 3
    ) {
      // 如果该HTML字符串是以<>包裹的，则跳过正则检查
      match = [null, selector, null];
    } else {
      match = rquickExpr.exec(selector);
    }

    // 匹配HTML标签或确保没有为id指定上下文
    // match有值，说明匹配到html标签(<xxx>)或者id(#xx)
    // match[1]有值说明匹配到的是Html标签，否则就为id
    if (match && (match[1] || !context)) {
      // 处理HTML标签
      if (match[1]) {
        //...
        return;
      } else {
        // 处理id
        // match[2]为去掉#的字符串，例如#app => match[2]就为app
        elem = document.getElementById(match[2]);

        if (elem) {
          this[0] = elem;
          this.length = 1;
        }
        return this;
      }
    } else if (!context) {
      return root.find(selector);
    }
  } else if (selector.nodeType) {
    // 处理$(DOMElement) 例如$(document)
    this[0] = selector;
    this.length = 1;
    return this;
  }
}
```

## each方法
>jQuery的一个迭代函数，用于遍历数组或对象，执行指定的操作

- 通过extend方法设置在jQuery对象上和jQuery.fn上(fn上调用的是jQuery上的each方法)
- `isArrayLike`函数判断当前传入的`context/obj`是否是数组/类数组对象
- 如果该回调函数返回false，则中断each

```js
each: function (context, callback) {
  let length, i = 0;

  // 判断当前传入的context是数组/类数组对象
  if (isArrayLike(context)) {
    // 遍历该数组/类数组对象
    length = context.length;
    for (; i < length; i++) {
      // 依次执行callback => 如果该回调函数返回false，中断循环
      // 第一个参数为this指向，本身，context[i]是DOM元素
      // 第二个参数为key
      // 第三个参数为value(DOM元素)
      if (callback.call(context[i], i, context[i]) === false) {
        break;
      }
    }
  } else {
    // 对象
    for (i in context) {
      if (callback.call(context[i], i, context[i]) === false) {
        break;
      }
    }
  }

  return context;
}
```

## val方法
- 不传参数(获取值): 获取匹配到的第一项的值
- 传参数(设置值): 将匹配到的所有项的值都设置为指定值
  - 原始值
  - 函数

```js
let rreturn = /\r/g;
jQuery.fn.extend({
  val: function (value) {
    let ret,
      valuesIsFunction,
      elem = this[0];

    // 处理不传递参数的情况——获取值
    if (!arguments.length) {
      // 如果有匹配到的Html标签
      if (elem) {
        ret = elem.value;

        if (typeof ret === "string") {
          return ret.replace(rreturn, "");
        }

        return ret === null ? "" : ret;
      }

      return;
    }

    valuesIsFunction = isFunction(value);

    return this.each(function (i) {
      let val;
      
      // nodeType为1表示的是元素节点(标签)
      // 仅处理元素节点
      if (this.nodeType !== 1) {
        return;
      }

      if (valuesIsFunction) {
        val = value.call(this, i, jQuery(this).val());
      } else {
        val = value;
      }

      if (val === null) {
        val = "";
      } else if (typeof val === "number") {
        val += "";
      } else if (Array.isArray(val)) {
        val = val.map(function (item) {
          return item === null ? "" : item + ""; 
        });
      }

      this.value = val;
    });
  }
});
```

## access函数
> 主要用于设置和获取集合的值的多用途方法
> 它可以在集合的每个元素上调用一个函数，并返回一个表示操作结果的对象

这个方法通常用于遍历和操作集合中的元素，例如添加、修改或删除属性，或者修改或读取元素的数据
- `elems`：集合中的元素。
- `fn`：在每个元素上执行的函数。
- `key`：可选参数，用于设置或获取元素属性或集合的值。
- `value`：可选参数，用于设置或获取元素属性或集合的值。
- `chainable`：可选参数，表示是否可以链式调用

```js
var access = function (elems, fn, key, value, chainable) {
  let i = 0, len = elems.length, raw;

  // 当传入的key是一个对象时，设置多个值
  if (toType(key) === "object") {
    chainable = true;
    for (i in key) {
      access(elems, fn, i, key[i], true);
    }
  } else if (value !== undefined) {
    // 设置单个值
    chainable = true;

    // 不为函数，则为原始值
    if (!isFunction(value)) {
      raw = true;
    }

    if (fn) {
      for (; i < len; i++) {
        fn(
          elems[i],
          key,
          raw ? value : value.call(elems[i], i, fn(elems[i], key))
        );
      }
    }
  }

  if (chainable) {
    return elems;
  }
  // 获取值，仅对第一个匹配项执行fn函数
  return len ? fn(elems[0], key) : undefined;
}
```

## attr方法、removeAttr方法
- 只传一个参数
  - 属性名字符串 => 获取该属性的值
  - 对象 => 属性名和值对象，设置多个属性值
- 传递两个参数: 
  - 第二个参数为值：设置单个属性值
    - 设置为null -> 调用removeAttr方法
    - 不为null -> `setAttribute`
  - 第二个参数为函数：执行函数设置值(在access方法中已经将函数执行的结果传递过来，所以我们不需要考虑如何处理函数，只需要知道函数的返回值就是我们需要设置的值)

还涉及到获取元素属性值，这里只简单通过元素的`getAttribute`方法获取即可.

```js
jQuery.fn.extend({
  attr: function (name, value) {
    // 只有name表示获取值
    // name和value同时有，表示设置值
    return access(this, jQuery.attr, name, value, arguments.length > 1);
  },
  removeAttr: function (name) {
    return this.each(function () {
      jQuery.removeAttr(this, name);
    });
  }
});
const rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);
jQuery.extend({
  attr: function(elem, name, value) {
    let ret,
      nType = elem.nodeType;

    // 不能对文本、注释、属性节点上的属性进行set/get
    if (nType === 3 || nType === 8 || nType === 2) {
      return;
    }

    // 设置值
    if (value !== undefined) {
      if (value === null) {
        // 移除该属性
        jQuery.removeAttr(elem, name);
        return;
      }

      elem.setAttribute(name, value + "");
      return value;
    }

    ret = jQuery.find.attr(elem, name);

    // 不存在属性则返回null
    return ret === null ? undefined : ret;
  },
  removeAttr: function (elem, value) {
    let name,
      i = 0,
      // 属性名称可以包含非HTML空白字符
      attrNames = value && value.match(rnothtmlwhite);

    if (attrNames && elem.nodeType === 1) {
      while (name = attrNames[i++]) {
        elem.removeAttribute(name);
      }
    }
  }
});

jQuery.find.attr = function (elem, attr) {
  return elem.getAttribute(attr) || null;
}
```

## prop方法
>`prop`方法只能获取元素固有的属性值

和`attr`方法十分类型，只不过在一些地方存在不同
```js
jQuery.fn.extend({
  prop: function (name, value) {
    return access(this, jQuery.prop, name, value, arguments.length > 1);
  },
  removeProp: function (name) {
    return this.each(function () {
      delete this[jQuery.propFix[name] || name];
    });
  }
});

jQuery.extend({
  prop: function (elem, name, value) {
    let nType = elem.nodeType;

    // 不能对文本、注释、属性节点上的属性进行set/get
    if (nType === 3 || nType === 8 || nType === 2) {
      return;
    }

    // 修复prop属性值
    name = jQuery.propFix[name] || name;
    
    // 设置值
    if (value !== undefined) {
      return (elem[name] = value);
    }

    return elem[name];
  },
  propFix: {
    "for": "htmlFor",
    "class": "className"
  }
});
```

## css方法
- 单个参数
  - 字符串 => 获取该属性的值
  - 数组 => 获取该属性列表的值，返回一个map
  - 对象 => 设置多个属性
- 两个参数
  - 字符串、字符串 => 设置单个属性
  - 字符串、函数 => 设置单个属性，值为函数返回值
```js
jQuery.fn.extend({
  css: function (name, value) {
    return access(this, function (elem, name, value) {
      let len, map = {}, i = 0;

      if (Array.isArray(name)) {
        len = name.length;

        for (; i < len; i++) {
          map[name[i]] = jQuery.css(elem, name[i]);
        }

        return map;
      }

      return value !== undefined
        // 设置
        ? jQuery.style(elem, name, value) 
        // 获取
        : jQuery.css(elem, name);
    }, name, value, arguments.length > 1);
  }
});
jQuery.extend({
  css: function (elem, name) {
    return curCss(elem, name);
  },
  style: function (elem, name, value) {
    // 不能给文本/注释节点设置样式
    if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
      return;
    }
    let style = elem.style;
    
    if (value !== undefined) {

      // 确保value不为null且value不为NaN
      if (value === null || value !== value) {
        return;
      }

      style[name] = value;****
    } else {
      return style[name];
    }
  }
});
// 获取CSS属性值
function curCss(elem, name, computed) {
  let ret;
  
  computed = computed || getStyles(elem);

  if (computed) {
    ret = computed.getPropertyValue(name) || computed[name];
  }

  return ret !== undefined ? ret + "" : ret;
}
// 获取styles对象
function getStyles(elem) {
  // 在DOM（文档对象模型）中，每个节点都有一个ownerDocument属性，它返回该节点所属的文档对象
  let view = elem.ownerDocument.defaultView;

  if (!view || !view.opener) {
    view = window;
  }

  return view.getComputedStyle(elem);
}
```

## empty方法
>对匹配到的项依次清空
```js
jQuery.fn.extend({
  empty: function () {
    var elem,
      i = 0;
      // 这里仅使用 !=  因为要匹配循环结束的undefined
    for (; (elem = this[i]) != null; i++) {
      if (elem && elem.nodeType === 1) {
        elem.textContent = "";
      }
    }
    return this;
  }
})
```

## text方法
- 不传参数(获取值)：将所有匹配到的项的文本内容拼接起来返回
- 一个参数
  - 字符串：将匹配到的项的文本内容都设置为该值
  - 数组：将匹配到的项的文本内容设置为该数组拼接起来的值，例如`["a", "b"]` => `a,b`
  - 对象: 将匹配到的项的文本内容设置为该对象（不可取），会显示文本`[Object...]`
  - 函数: 函数返回的值将会作为所有匹配到的项的文本内容

>同样是通过调用`access`函数来处理，不同的是，text方法不存在key属性，所以key设置为null，但之前我们处理的access没有处理文本的情况，所以也需要修改`access`

```js
//* 修改后的access函数，仅显示新增的内容
var access = function (elems, fn, key, value, chainable) {
  // 新增bulk，用于判断key是否为null
  let bulk = key == null;

  //...
  // else if (value !== undefined) {
    //...
    if(bulk) {
      // 非函数，不需要遍历elems, 所以直接在这里调用fn方法，只传入value
      // fn置为null,这样后面就不会执行下面的调用
      if (raw) {
        fn.call(elems, value);
        fn = null;
      } else {
        // 函数，因为不需要用到key, 所以重写fn函数
        bulk = fn;
        fn = function (elem, _key, value) {
          return bulk.call(jQuery(elem), value);
        }
      }
    } 
  // }

  // 获取
  if (bulk) {
    return fn.call(elems);
  }
}
```

**text方法**
```js
jQuery.fn.extend({
  text: function (value) {
    return access(this, function (value) {
      return value === undefined ? jQuery.text(this) : this.empty().each(function (_, textDOM) {
        // jQuery是通过this来操作的，这里使用each函数的第二个参数也一样
        textDOM.textContent = value;
      });
    }, null, value, arguments.length);
  },
});

// 获取文本
jQuery.text = function (elem) {
  var node,
    ret = "",
    i = 0,
    nodeType = elem.nodeType;

  // 传入的elem是通过jQuery获取到的类数组对象，我们需要遍历该对象
  if (!nodeType) {
    while ((node = elem[i++])) {
      ret += jQuery.text(node);
    }
  } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
    // nodeType 1 => 元素节点
    // nodeType 9 => Docment节点
    // nodeType 11 => Document Fragment节点
    if (typeof elem.textContent === "string") {
      return elem.textContent;
    } else {
      // 暂不处理
    }
  }
  return ret;
}
```

## first/last/eq方法
- eq方法，获取给定索引的值的集合
  - 传入的索引参数可以是负数
  - `j = +i + (i < 0 ? len : 0);`
    - `+i`是将非数字转为数字
    - 当i为>=0时，要获取的索引为 i
    - 当i为负数时，要获取的索引为len - i
```js
jQuery.fn = jQuery.prototype = {
  // ...
  // first
  first: function () {
    return this.eq(0);
  },
  // last
  last: function () {
    return this.eq(-1);
  },
  // eq
  eq: function (i) {
    var len = this.length,
      j = +i + (i < 0 ? len : 0);
    return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
  }
}
```

## 通用扁平化方法
- 只能扁平化一层
- 如果浏览器支持flat方法，就直接使用flat，否则使用concat方法配合apply展开
```js
const arr = [];// 用来引用原型上的方法

// 定义扁平化方法，只能展开一层
const flat = arr.flat ? function(array) {
  // 直接执行flat函数，用call和apply一样
  return arr.flat.call(array);
} : function (array) {
  // 这里必须是要apply，因为需要将array的参数展开传给concat的数组
  return arr.concat.apply([], array);
}
```

## map方法
>遍历类数组/数组，对象，对每一项执行传入的回调方法，并将结果保存到一个集合中，返回出去
```js
jQuery.extend({
  // map
  map: function (elems, callback) {
    var length, value,
      i = 0,
      ret = [];

    // 遍历数组，将每个项转为新值
    if (isArrayLike(elems)) {
      length = elems.length;
      for (; i < length; i++) {
        value = callback(elems[i], i);

        if (value !== null) {
          ret.push(value);
        }
      }
    } else {
      // 遍历对象的key
      for (i in elems) {
        value = callback(elems[i], i);

        if (value !== null) {
          ret.push(value);
        }
      }
    }

    return flat(ret);
  }
})
```

## dir方法
- dir方法（direction方向）朝一个方向一直迭代到尽头
```js
// elem为起点，dir为方向
var dir = function (elem, dir) {
  var matched = [];
  // 例如previousSibling, 每次都将elem设置为它的前一个兄弟元素，依次迭代，将匹配到的项加入到结果集中
  while ((elem = elem[dir]) && elem.nodeType !== 9) {
    if (elem.nodeType === 1) {
      matched.push(elem);
    }
  }

  return matched;
}
```

## uniqueSort: 对结果进行去重并排好序
- 先对结果集进行排序，然后使用一个指针来移动，判断当前位置元素和下一个元素是否相等，如果相等，将索引加入到待删除数组中，指针后移...

```js
var hasDuplicate = true;
// uniqueSort方法
jQuery.uniqueSort = jQuery.unique = function (results) {
  var elem,
    duplicates = [],
    j = 0,
    i = 0;

  // 先对results进行排序
  // 使用text方法获取到文本，然后排序——这里只是简单模拟，并不准确
  results.sort(function (a, b) {
    var contentA = $$(a).text();
    var contentB = $$(b).text();
    return (contentA < contentB) ? -1 : (contentA > contentB);
  });

  if (hasDuplicate) {
    // 循环进行两两比较，存在重复项就添加进duplicates
    // 这里的results是经过排序后的，所以可以进行两两比较去重
    while (elem = results[i++]) {
      // 判断当前项和下一项是否相等
      if (elem === results[i]) {
        // j赋值为重复数组的长度
        // duplicates记录需要移除的下标
        j = duplicates.push(i);
      }
    }
    // 循环删除重复项
    while (j--) {
      results.splice(duplicates[j], 1);
    }
  }

  return results;
}
```

## prevAll: 返回在它之前的所有兄弟元素
```js
var rparentsprev = /^(?:parents|prev(?:Until|All))/;
// 当从唯一集合开始时保证生成唯一集合的方法
var guaranteedUnique = {};

jQuery.each({
  prevAll: function (elem) {
    return dir(elem, "previousSibling");
  }
}, function (name, fn) {
  jQuery.fn[name] = function () {
    var matched = jQuery.map(this, fn);

    // length > 1的情况，就可能存在出现重复结果
    if (this.length > 1) {
      // 移除重复结果
      if (!guaranteedUnique[name]) {
        jQuery.uniqueSort(matched);
      }

      // parents*和prev-derivatives的逆序
      if (rparentsprev.test(name)) {
        matched.reverse();
      }
    }
    
    return this.pushStack(matched);
  }
});
```

## index方法
- 不传参数：当前元素相对于父元素的索引值
  - 借用了first方法和prevAll方法
  - 通过first方法取到匹配项的第一个元素
  - prevAll方法会返回在它之前的所有兄弟元素
- 传递一个参数：
```js
jQuery.fn.extend({
  index: function (elem) {
    // 没有参数的情况下，返回他相对于父节点的index
    // 如果存在父节点那么获取第一个匹配项的下标——通过取prevAll()的length就可以得到索引
    return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
  }
});
```

## xxx