import { useState, useEffect } from 'react';
import globalConfig from "@cfg/global";
import "@s/module/header.css";

const { header: { title, subtitle, scrollCritical } } = globalConfig;

function Header() {
  const [scrollHeader, setScrollHeader] = useState('');

  useEffect(() => {
    const scrollChange = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const criticalVal = scrollCritical || 100;
      if (scrollY < criticalVal && !scrollHeader) return;
      if (scrollY >= criticalVal) {
        setScrollHeader('header__scroll');
      } else {
        setScrollHeader('');
      }
    };

    // scroll event trigger(监听滚动事件)
    window.addEventListener('scroll', scrollChange);
    return () => {
      window.removeEventListener('scroll', scrollChange);
    };
  }, [scrollHeader]);

  return (
    <header className={`header ${scrollHeader}`}>
      <div className="header__bg flex a_center gap-col-3 j_center">
        <a href="#" title={title}>
          <img src="/vite.svg" className="header__logo" alt="header big logo" />
        </a>
        <div className="header__content flex column gap-row-1">
          <h1 className="header__title">{ title }</h1>
          <p className="header__subtitle">{ subtitle }</p>
        </div>
      </div>
      <nav className="nav flex j_between a_center">
        <a className="flex a_center gap-col-1" href="#" title={title}>
          <img src="/vite.svg" className="nav__logo" alt="nav logo" />
          <span className="nav__title">{title}</span>
        </a> 
        <div className="flex gap-col-1-5">
          <i className="iconfont icon-dark-mode nav__icon" title="dark mode"></i>
          <i className="iconfont icon-search nav__icon" title="search"></i>
        </div>
      </nav>
    </header>
  );
}

export default Header;