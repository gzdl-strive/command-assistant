/**
 * 节流函数
 * @param func 
 * @param wait 
 */
function throttle(func: () => void, delay = 500) {
  let timer: NodeJS.Timeout | null;
  return function () {
    if (!timer) {
      timer = setTimeout(function () {
        func();
        timer = null;
      }, delay);
    }
  };
}

/**
 * localStorage
 */
function getLocalStorageItem(key: string) {
  return localStorage.getItem(key);
}
function setLocalStorageItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

/**
 * 修改CSS变量
 * @param key 
 * @param value 
 */
function setCSSVariable(key: string, value: string) {
  document.documentElement.style.setProperty(key, value);
}

/**
 * 动态导入markdown文件
 * @param folder 所属文件夹
 * @param name 文件名
 * @returns 返回md文件的内容，字符串形式
 */
async function dynamicImportMd(folder: string, name: string) {
  const file = await import(`../assets/document/${folder}/${name}.md?raw`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(file.default);
    }, 500);
  });
}

/**
 * 计算两个日期字符串差值
 * @param dateString1
 * @param dateString2
 * @returns 返回差值，单位秒
 */
function calcDateStringValue(dateString1: string, dateString2: string) {
  return Math.abs(new Date(dateString1).getTime() - new Date(dateString2).getTime()) / 1000;
}

/**
 * 获取当前日期时间字符串
 * @returns 返回格式为YYYY-MM-DD HH:mm:ss格式时间字符串
 */
function getCurrentDateTimeString() {
  const currentDate = new Date();
  // ISO 8601格式示例：2023-06-28T01:41:52.000Z
  // toISOString 方法将日期转换为 ISO 8601 格式的字符串，并使用 split('T')[0] 方法将日期部分提取出来
  // toLocaleTimeString 方法将时间转换为本地时间格式的字符串
  return currentDate.toISOString().split('T')[0] + ' ' + currentDate.toLocaleTimeString();
}

/**
 * 判断传入的元素是否出现在视口中
 * @param element 
 * @returns 
 */
function isInViewport(element: HTMLDivElement) {
  // 获取可视窗口高度
  const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  // 获取滚动条滚动的高度
  const scrollTop = document.documentElement.scrollTop;
  // 获取元素偏移的高度。就是距离可视窗口的偏移量
  // const offsetTop = element.offsetTop; // 计算出来的不准确，父元素中存在定位导致的
  const offsetTop = calcOffsetTop(element);

  // 出现在视口，且不超出
  return offsetTop - scrollTop <= screenHeight && (offsetTop + element.clientHeight) >= scrollTop;
}

/**
 * 判断传入的元素是否整个暴露在可视窗口内
 * @param element 
 * @returns 
 */
function isCompleteInViewport(element: HTMLElement) {
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  // 当滚动条滚动时，top, left, bottom, right时刻会发生改变。
  const {
    top,
    right,
    bottom,
    left
  } = element.getBoundingClientRect();
  return (top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight);
}

/**
 * 计算当前元素距离顶部距离
 * @param dom 
 * @param distance 
 * @returns 
 */
// offsetParent就是距离该子元素最近的进行过定位的父元素（position：absolute relative fixed），如果其父元素中不存在定位则offsetParent为：body元素
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function calcOffsetTop(dom: any, distance = 0): number {
  if (['BODY', null].includes(dom.offsetParent.nodeName)) {
    distance += dom.offsetTop;
    return distance;
  } else {
    distance += dom.offsetTop;
    return calcOffsetTop(dom.offsetParent, distance);
  }
}


export {
  throttle,
  getLocalStorageItem,
  setLocalStorageItem,
  setCSSVariable,
  dynamicImportMd,
  calcDateStringValue,
  getCurrentDateTimeString,
  isInViewport,
  isCompleteInViewport
};