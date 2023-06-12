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

async function dynamicImportMd(folder: string, name: string) {
  const file = await import(`../assets/document/${folder}/${name}.md?raw`);
  return file.default;
}

export {
  throttle,
  getLocalStorageItem,
  setLocalStorageItem,
  setCSSVariable,
  dynamicImportMd
};