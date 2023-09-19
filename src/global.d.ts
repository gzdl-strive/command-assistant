export {}; // 使用 export {} 使文件成为模块。

declare global {
  // 声明进入全局命名空间的类型，或者增加全局命名空间中的现有声明。
  type ComFunc = (...args: unknown[]) => void;
}