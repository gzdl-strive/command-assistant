## 简介
>标记语言、应用于文本片段，使得文本在文档中具有不同的含义，将文档结构化为逻辑块，可以嵌入图片、影像等.

- **空元素**：不是所有元素都拥有开始标签、内容和结束标签。一些元素**只有一个标签**，通常用来在该元素的位置上插入/嵌入一些东西。例如`img`

- **布尔属性**: 没有值的属性，布尔属性只能有一个值，这个值一般与属性名称相同

- `<!DOCTYPE html>`: 声明文档类型最短的有效文档声明
  
- `<meta charset="utf-8" />`：这个元素代表了不能由其他 HTML 元相关元素表示的元数据. charset 属性将你的文档的字符集设置为 UTF-8，其中包括绝大多数人类书面语言的大多数字符 

- **特殊字符**：使用字符引用，表示字符的特殊编码

- 注释：浏览器会忽略注释。用户不可见。注释的目的是用于解释你的逻辑或编码。

## 元信息
>HTML头部的作用是用于保存页面的一些**元数据**

- **标题`title`**：为整个文档添加标题。title的内容被作为建议的书签名.
- 元数据：**描述数据的数据**
    - 字符编码
    - SEO
    - 作者和描述
    - 自定义图标
    - 其它元数据
- 引用`css`和`js`
- 设定主语言


## 文本处理、超链接、文本格式
### 文本处理
- 标题(`h1-h6`)和段落`p`
- 列表
  - 无序(`ul`)、有序(`ol`)、嵌套列表
- 重点强调
  - 强调`<em>` -> 斜体
  - 强烈的重要性`<strong>` -> 加粗
- 表象元素: 仅影响表象而没有语义
  - `<i>`
  - `<b>`
  - `<u>`

### 超链接
>能够将我们的文档链接到任何其他文档（或其他资源），也可以链接到文档的指定部分

- 块级链接: 将块级元素包裹在标签内部
- 图片链接: 将图片包裹在标签内部
- 文档片段: 链接到文档的特定部分

**最佳实践**
1. 使用清晰的链接措辞
2. 链接到非HTML资源——留下清晰的指示
3. 下载链接时使用download属性

### 文本格式
- **描述列表**：标记一组项目极其相关描述，例如术语和定义，或者问题和答案等。`<dl><dt></dt><dd></dd></dl>`
- 引用：块引用、行内引用、引文
- 缩略语`<abbr>`：包裹一个缩略或缩写，并且提供缩写的解释
- 标记联系方式`<address>`：标记联系方式，仅包含联系方式.
- 上标`<sup>`、下标`<sub>`
- 计算机代码
	- `<code>`：用于标记计算机通用代码
	- `<pre>`：用于保留空白字符(通常用于代码块)
	- `<var>`：用于标记具体变量名
	- `<kbd>`：用于标记输入电脑的键盘(或其他类型)输入
	- `<samp>`：用于标记计算机程序的输出
- 标记时间和日期`<time`>： 将时间和日期标记为可供机器识别的格式

## 文档与网站架构
### 标准网站架构
- 页眉`<header>`：通常横跨于整个页面顶部，有一个大标题 和/或 一个标志
- 导航栏`<nav>`：指向网站各个主要区段的超链接。通常用菜单按钮、链接或标签页表示。
- 主内容`<main>`：中心的大部分区域是当前网页大多数的独有内容。——每个页面只能用一次，且直接位于body种。最好不要把他嵌套进其他元素。
- 侧边栏`<aside>`：一些外围信息、链接、引用、广告等。通常与主内容相关(例如一个新闻页面上，侧边栏可能包含作者信息或相关文章链接)——包含一些间接信息
- 页脚`<footer>`: 横跨页面底部的狭长区域。和标题一样，页脚是放置公共信息的(比如版权声明或联系方式)，一般使用较小字体，且通常为次要内容。

### 其它布局元素
- 文章`<article>`：包围的内容即一篇文章，与页面其他部分无关(比如一篇博文)
- 区块`<section>`：与article类似，section更适合用于组织页面使其按功能分块。
- 无语义元素：div和span
- 换行和水平分割线

### 规划一个简单的网站
1. 时刻记住，大多数（不是全部）页面会使用一些相同的元素，例如导航菜单以及页脚内容。记录这些对所有页面都通用的内容.
2. 接下来，可为页面结构绘制草图,记录每一块的作用
3. 下面，对于期望添加进站点的所有其他（通用内容以外的）内容展开头脑风暴，直接罗列出来。——列出所有内容
4. 下一步，试着对这些内容进行分组，这样可以让你了解哪些内容可以放在同一个页面
5. 接下来，试着绘制一个站点地图的草图，使用一个气泡代表网站的一个页面，并绘制连线来表示页面间的一般工作流。主页面一般置于中心，且链接到其他大多数页面；小型网站的大多数页面都可以从主页的导航栏中链接跳转。也可记录下内容的显示方式。

## 多媒体与嵌入
### 图片
- `src`：资源的url路径
- `alt`：备选文本，用于图片无法显示的情况
- `title`：鼠标悬浮时显示的内容
- `width`：图片的宽度
- `height`：图片的高度
- 搜索引擎会读取图像的文件名并将它们计入SEO
- 有时被称为替换元素，因为元素的内容和尺寸由外部资源所定义，而不是元素自身
- 使用`figure`来添加**说明文字**

### 音视频
- `src`：视频资源地址
- `controls`：用户可以控制视频或音频的回放功能。
- **使用多个播放源以提高兼容性**
	- 将src属性从video中移除，转而将它放置几个单独标签`source`中
- 其他属性：`width/height`、`autoplay`、`loop`、`muted`(默认关闭声音)、`poster`（指向一个图像url，在视频播放前显示）、`preload`(用来缓存较大的文件)
- `preload`
	- `"none"`：不缓存
	- `"auto"`：页面加载后缓存媒体文件
	- `"metadata"`：仅缓存文件的元数据
>`audio`: 和video类似，不过由于没有视觉部件，所以不支持`width/height`，也不支持`poster`

### iframe
- 旨在允许你将其他 Web 文档嵌入到当前文档中
- `allowfullscreen`：是否允许全屏，允许的话，则可以通过全屏API设置全屏模式
- `frameborder`：如果设置为 1，则会告诉浏览器在此框架和其他框架之间绘制边框，这是默认行为。0 删除边框。不推荐这样设置，因为在 CSS 中可以更好地实现相同的效果。`border: none;`
- `src`：该属性与`<video>`、`<img>`一样，指向要嵌入文档的url路径
- `width/height`：指定iframe的宽高
- `sandbox`：该属性需要在已经支持其他 `<iframe>` 功能（例如 IE 10 及更高版本）但稍微更现代的浏览器上才能工作，该属性可以**提高安全性设置**；
- 备选内容
- 安全隐患
	- 单击劫持：一种常见的 iframe 攻击。黑客将隐藏的 `iframe` 嵌入到你的文档中（或将你的文档嵌入到他们自己的恶意网站），并使用它来捕获用户的交互。这是误导用户或窃取敏感数据的常见方式。
	- 注意点
		- 只在必要时嵌入第三方内容。
		- 使用HTTPS
			- 减少了远程内容在传输过程中被篡改的机会
			- 防止嵌入式内容访问你的父文档中的内容，反之亦然
		- 始终使用sandbox属性
		- 配置CSP指令

### SVG
- 位图：使用像素网格定义——位图文件精确包含了每个像素的位置和它的色彩信息。流行的格式包括`.bmp、.png、.jpg或.gif`等.
- 矢量图形：使用**算法来定义**——包含了图形和路径的定义，电脑可以根据这些定义计算出它们在屏幕上渲染时应该呈现的样子。——**缩放不失真**
- SVG：用于描述矢量图形的XML语言。SVG用于标记图形，而不是内容
- 如何添加SVG到页面
	- 使用img标签嵌入SVG
	- CSS背景图像
	- 编写SVG代码,直接在HTML文档中使用——内联SVG

### 响应式图片
>为了在不同分辨率的设备上都能表现良好

- 分辨率切换：不同的尺寸
	img的`srcset`和`sizes`
		- srcset
		- sizes
- 分辨率切换：相同尺寸，不同分辨率：使用`srcset`结合x语法
- 美术设计：更改显示的图像以适应不同的显示尺寸——使用picture元素
- 不使用CSS或JS来实现
	- 当浏览器开始加载一个页面，它会在主解析器开始加载和解析页面的 `CSS` 和 `JavaScript` 之前先下载（预加载）任意的图片。这种有用的机制总体上会减少页面加载时间，但是它对响应式图片没有帮助，所以需要类似 `srcset` 的实现方法。因为你不能先加载好 `<img>` 元素后，再用 JavaScript 检测可视窗口的宽度，如果觉得大小不合适，再动态地加载小的图片替换已经加载好的图片，这样的话，原始的图像已经被加载了，然后你又加载了小的图像，这反而更不“响应”了。

## 表格
### 表格基础
- table：表格的内容都包含在该标签内
- tr(table row)：新行
- th(table header)：表格中的标题->突出，更简单找到数据
- td(table data)：单元格->表格中的最小内容容器

表格标题好处，随着scope属性，这个属性允许你让表格变得更加无障碍，每个标题与相同行或列中的所有数据相关联。

- 允许单元格跨行和列
	- `colspan`
	- `rowspan`
- 为表格中的列提供共同的样式
	- `<colgroup>`和`<col>`

### 表格高级特性和无障碍
- 使用`<caption>`为表格添加一个标题 => 对哪些希望可以快速浏览器网页中的表格来说是非常好的功能.
- 添加`<thead>`、`<tfoot>`、和`<tbody>`结构
  - `<thead>`：通常放在第一行，代表头部
  - `<tfoot>`：放在在底部，一般是最后一行，往往是对前面所有行的总结
  - `<tbody>`：放在thead下面或tfoot下面。

### 无障碍
- 使用列和行的标题: 屏幕阅读设备会识别所有的标题，然后在它们和它们所关联的单元格之间产生编程关联
- scope属性：可以添加在th元素中，用来帮助屏幕阅读设备更好地理解那些标题单元格，这个标题单元格到底是列标题呢，还是行标题。(`col`、`row`、`rowgroup`、`colgroup`)

**id和标题属性** 
>替代scope属性，可以使用id和headers属性来创造标题与单元格之间的联系。
1. 为每个`<th>`元素添加一个唯一的 id 
2. 为每个 `<td>` 元素添加一个 `headers` 属性。每个单元格的`headers` 属性需要包含它从属于的所有标题的 id，之间用空格分隔开。


## Web表单
>web 表单是由一个或多个**表单控件**（有时称为小部件），以及一些有助于构建整个表单的附加元素组成——通常被称为`HTML表单`。

- form元素: 所有表单都以一个form元素开始
  - `action`: 提交表单时，需要把所收集的数据发送给谁(`URL`)
  - `method`: 发送数据的HTTP方法(通常为`get`或`post`)

>`input`是空元素，意味着不需要关闭标签。`textarea`不是空元素，因此需要使用适当的结束标签来关闭。

**服务端处理表单数据**
- name属性：表单控件添加name属性

> 严格禁止在一个表单内嵌套另一个表单。嵌套会使表单的行为不可预知，而这取决于正在使用的浏览器。

- `<fieldset>`: 用于创建具有相同目的的小部件组的方式，出于样式和语义目的.
- `<legend>`: legend的文本内容正式地描述了`<fieldset>`里所含有部件的用途。

## 原生表单部件
- 常见输入类型元素(input): `button`、`checkbox`、`file`、`hidden`、`image`、`password`、`radio`、`reset`、`submit` 和 `text`

**通用属性**
- autofocus: 自动聚焦。默认false
- disabled: 禁用.默认false
- form: 小部件与之相关联的表单元素。
- name: 元素名称
- value: 元素初始值

## HTML5的输入类型
- `type="emial"`: E-mail地址地段(搭配`multiple`允许输入多个地址，以英文逗号分隔. `pattern`属性可以自定义验证行为)
- `type="search"`: 创建搜索框
- `type="tel"`: 电话号码字段(专门用于输入电话号码的文本域)
- `type="url"`: URL字段
- `type="number"`: 数字字段(`min`和`max`控制输入的最小值和最大值，`step`属性步长，如果需要允许浮点数输入，要指定`step="any"`)
- `type="range"`: 滑块控件（`min`、`max`、`step`）
- `type="datetime-local"`: 创建了显示和选择一个没有特定时区信息的日期和时间的控件（所有日期和时间控件都可由`min`、`max`、`step`进一步控制）
- `type="month"`: 创建了显示和选择带有年份信息的某个月的控件
- `type="week"`: 创建了显示和选择一年中特定编号周的控件。
- `type="time"`: 创建了显示和选择时间的控件
- `type="color"`: 颜色选择器

## 样式化表单
目前，在使用表单时使用 CSS 仍然有一些困难。这些问题可以分为三类：
- 好的：`form、fieldset、label、output`，文本字段和按钮(在跨平台上时很少出现问题)
- 不好的: `legend、checkbox和radio、placeholder`(难以被美化，并且可能需要一些复杂的技巧，偶尔需要高级的 CSS3 知识)
- 丑陋的: `select、option、optgroup、datalist，文件选择器、progress、meter`（根本不能用应用 CSS 样式—— CSS 目前还不足以表达这些小部件的所有细微部分）

## UI伪类
- `:hover`: 只在鼠标指针悬停在一个元素上时选择该元素
- `:focus`: 只在元素被聚焦时选择该元素（也就是说，通过键盘上的 `tab` 键选中该元素）
- `:active`: 只在元素被激活时选择该元素（也就是说，通过点击或键盘上的 `Return` / `Enter` 键选中该元素）
- `:required`和`:optional`: 针对必需的或可选的表单控件
- `:valid` 和 `:invalid`、`:in-range` 和 `:out-of-range`：针对表单控件，根据对其设置的表单验证约束，或范围内/范围外，是有效/无效的。
- `:enabled` 和 `:disabled`、`:read-only` 和 `:read-write`：针对启用或禁用的表单控件（例如，设置了 disabled HTML 属性），以及读写或只读的表单控件（例如，设置了 readonly HTML 属性）。
- `:checked`、`:indeterminate` 和 `:default`：分别针对被选中的复选框和单选按钮，处于不确定的状态（既不被选中也不被选中），以及页面加载时默认选择的选项（例如，一个设置了 checked 属性的 `<input type="checkbox">`，或者一个设置了 `selected` 属性的 `<option>` 元素）。

## 表单校验
- 我们希望以正确的格式获取到正确的数据
- 我们希望保护我们的用户
- 我们希望保护我们自己

**不同类型的表单数据校验**
- 客户端校验
  - js校验，可以完全自定义
  - HTML5内置校验，性能好，但不能像js那样自定义
- 服务端校验

### 自定义错误信息
- HTML5提供`constraint validation API`
```js
const email = document.getElementById("mail");

email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I expect an e-mail, darling!");
  } else {
    email.setCustomValidity("");
  }
});
```

- 显示明确的错误消息
- 放宽输入格式限制
- 指出错误发生的位置

## 发送文件
>用 HTML 表单发送文件是一个特殊的例子。文件是二进制数据——或者被认为是这样的——而所有其他数据都是文本数据。由于 HTTP 是一种文本协议，所以处理二进制数据有特殊的要求。

- `enctype`属性: 允许提交表单时请求中的`Content-Type`的HTTP数据头的值。默认是`application/x-www-form-urlencoded`(已编码为URL参数的表单数据)

**发送文件的步骤**
1. method为`post`, 因为文件内容不能放入URL参数中
2. 将`enctype`值设置为`multipart/form-data`，因为数据将被分成多个部分，每个文件单独占用一个部分，表单正文中包含的文本数据（如果文本也输入到表单中）占用一个部分。
3. 包含一个或多个`File picker`小部件，允许用户选择将要上传的文件。

## 如何构建自定义表单控件
- 设计、结构、语义
- 无障碍

>`ARIA`代表“**无障碍富互联网应用**”.使网络应用和自定义组件易于访问，它本质上是一组用来拓展 HTML 的属性集，以便我们能够更好的描述角色、状态和属性
  - `role`属性: 定义元素的用途(每一个role定义了它自己的需求和行为)
  - `aria-selected`属性: 标记当前被选中的选项，让辅助技术告知用户当前的选项是什么。