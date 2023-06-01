import { useState, useEffect } from 'react';
import SvgIcon from "@c/svg-icon";
import globalConfig from "@cfg/global";
import module from "./style.module.css";

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
    <header className={`${module.header} ${module[scrollHeader]}`}>
      <div className={`${module.header__bg} flex a_center gap-col-3 j_center`}>
        <a href="#" title={title}>
          <img src="/vite.svg" className={module.header__logo} alt="header big logo" />
        </a>
        <div className={`${module.header__content} flex column gap-row-1`}>
          <h1 className={module.header__title}>{ title }</h1>
          <p className={module.header__subtitle}>{ subtitle }</p>
        </div>
      </div>
      <nav className={`${module.nav} flex j_between a_center`}>
        <a className="flex a_center gap-col-1" href="#" title={title}>
          <img src="/vite.svg" className={module.nav__logo} alt="nav logo" />
          <span className={module.nav__title}>{title}</span>
        </a> 
        <div className="flex gap-col-1-5">
          <SvgIcon name="dark-mode" className={module.nav__icon}></SvgIcon>
          <SvgIcon name="search" className={module.nav__icon}></SvgIcon>
        </div>
      </nav>
    </header>
  );
}

export default Header;