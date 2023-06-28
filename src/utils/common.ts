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

export {
  throttle,
  getLocalStorageItem,
  setLocalStorageItem,
  setCSSVariable,
  dynamicImportMd,
  calcDateStringValue,
  getCurrentDateTimeString
};