import { useState, useEffect } from 'react';
import SvgIcon from "@c/svg-icon";
import globalConfig from "@cfg/global";
import { getLocalStorageItem, setLocalStorageItem, setCSSVariable } from "@u/common";
import Scroll from "@u/scroll";
import module from "./style.module.css";

const { header: { title, subtitle, scrollCritical, theme: HeaderTheme } } = globalConfig;

function Header() {
  const [scrollHeader, setScrollHeader] = useState('');
  const [theme, setTheme] = useState(getLocalStorageItem("theme") || HeaderTheme);

  // 点击切换主题
  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const scrollChange = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const criticalVal = scrollCritical || 100;
      if (scrollY < criticalVal && !scrollHeader) return;
      if (scrollY >= criticalVal) {
        setScrollHeader('header__scroll');
        setCSSVariable("--sidebar-offset-height", "calc(100vh - var(--document-sidebar-sticky-top))");
      } else {
        setScrollHeader('');
        setCSSVariable("--sidebar-offset-height", "calc(100vh - var(--header-height) - var(--document-description-height))");
      }
    };

    // scroll event trigger(监听滚动事件)
    window.addEventListener("scroll", scrollChange);
    return () => {
      window.removeEventListener("scroll", scrollChange);
    };
  }, [scrollHeader]);

  useEffect(() => {
    setLocalStorageItem("theme", theme);
    theme === "light" 
      ? document.body.classList.remove("dark")
      : document.body.classList.add("dark");
  }, [theme]);

  return (
    <header className={`${module.header} ${module[scrollHeader] || ''}`}>
      <div className={`${module.header__bg} flex a_center j_center`}>
        <img src="/vite.svg" className={module.header__logo} alt="header big logo" />
        <div className={`flex column gap-row-1`}>
          <h1 className={module.header__title}>{ title }</h1>
          <p className={module.header__subtitle}>{ subtitle }</p>
        </div>
      </div>
      <nav className={`${module.nav} flex j_between a_center`}>
        <a className="flex a_center gap-col-1" title={title} onClick={Scroll.Top}>
          <img src="/vite.svg" className={module.nav__logo} alt="nav logo" />
          <span className={module.nav__title}>{title}</span>
        </a> 
        <div className="flex gap-col-1-5">
          <SvgIcon name={`${theme === "light" ? "dark" : "light"}-mode`} className={module.nav__icon} onClick={switchTheme}></SvgIcon>
          <SvgIcon name="search" className={module.nav__icon}></SvgIcon>
        </div>
      </nav>
    </header>
  );
}

export default Header;