class Scroll {
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
}

export default Scroll;