import { useState, useEffect } from "react";
import Scroll from "@u/scroll";
import module from "./style.module.css";

function useScrollTop() {
  const [visible, setVisible] = useState('');

  useEffect(() => {
    const scrollChange = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const criticalVal = 350;
      if (scrollY >= criticalVal) {
        setVisible('show');
      } else {
        setVisible('');
      }
    };

    // scroll event trigger(监听滚动事件)
    window.addEventListener('scroll', scrollChange);
    return () => {
      window.removeEventListener('scroll', scrollChange);
    };
  }, []);

  return (
    <div
      className={`${module.container} ${module[visible]} flex j_center a_center`}
      onClick={Scroll.Top}
    >
      <a className={module.arrow}>↑</a>
    </div>
  );
}

export default useScrollTop;