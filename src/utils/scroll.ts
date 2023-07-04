class Scroll {
  /**
   * 滚动到顶部
   */
  static Top() {
    window.scrollTo({
      top: 0
    });
  }

  /**
   * 滚动到指定DOM元素的底部
   * @param element 
   */
  static ScrollToBottom(element: HTMLElement) {
    element.scrollTo(0, element.scrollHeight);
  }

  // 滚动到指定位置
  static ScrollToPos(pos: number) {
    window.scrollTo({
      top: pos
    });
  }
}

export default Scroll;