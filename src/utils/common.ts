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

export {
  throttle,
  getLocalStorageItem,
  setLocalStorageItem
};