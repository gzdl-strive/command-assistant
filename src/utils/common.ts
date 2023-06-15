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
    }, 1000);
  });
}

export {
  throttle,
  getLocalStorageItem,
  setLocalStorageItem,
  setCSSVariable,
  dynamicImportMd
};