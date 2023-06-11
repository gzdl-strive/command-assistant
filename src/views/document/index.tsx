import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { throttle } from "@u/common";
import Scroll from "@u/scroll";
import Markdown from "@u/markdown"; // 解析md字符串为html结构
import globalConfig from "@cfg/global";
import module from "./style.module.css";
import direct from "@a/document.json";
import { DirectType, LocationState, DirType } from "./typing";

const directory: DirectType = direct.directory;

const { header: { scrollCritical } } = globalConfig;

let activeFlag = false; // 点击锚点flag => 用于解决锚点active闪烁

function Document() {
  // 获取路由传递过来的参数，defaultDir为默认展示文档，describe为页面描述
  const location = useLocation();
  const { 
    defaultDir,
    describe
  }: LocationState = location.state;

  const [curDir, setCurDir] = useState({
    title: '',
    path: '',
    desc: describe
  });
  const [contentStr, setContentStr] = useState('');
  const [tocDir, setTocDir] = useState<string[]>([]);
  const [tocActive, setTocActive] = useState('');

  // 点击修改目录
  const changeDir = (dir: DirType) => {
    const { title, path, desc } = dir;
    if (title === curDir.title) return;
    setCurDir({
      title,
      path,
      desc,
    });
    Scroll.Top();
    
    import(/*@vite-ignore*/path + "?raw").then(res => {
      if (res && res.default) {
        setContentStr(res.default);
        setTocActive('');
      }
    });
  };

  // 传入dirName
  const getMDByName = (dirName: string) => {
    if (dirName) {
      directory.forEach(item => {
        item.children.length && item.children.forEach(subItem => {
          if (subItem.title.indexOf(dirName) !== -1) {
            changeDir(subItem);
          }
        });
      });
    } else {
      changeDir(directory[0].children[0]);
    }
  };

  // 传入md字符串，返回html结构
  const transformToHtml = (str: string) => {
    const mk = new Markdown("document", str);
    return mk.html;
  };

  // 跳转至指定锚点
  const scrollToAnchor = (name: string) => {
    if (name) {
      const anchorElement = document.getElementById(name);
      if (!anchorElement) return;
      activeFlag = true;
      setTocActive(name);
      const criticalVal = scrollCritical || 100;
      let plusNum = 180;
      const scrollY = anchorElement.offsetTop;
      if (scrollY >= criticalVal) {
        plusNum = 80;
      }
      // 减去头部高度 => 判断offsetTop和滚动条高度 => 大/小
      window.scrollTo({
        top: scrollY - plusNum
      });
      setTimeout(() => {
        activeFlag = false;
      }, 500);
    }
  };

  // 默认展示文档
  useEffect(() => {
    if (!directory.length || !directory[0].children.length) {
      return;
    }
    getMDByName(defaultDir);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultDir]);
  // 设置toc目录列表
  useEffect(() => {
    const tocDirList = document.querySelectorAll("h2[id]");
    const result: string[] = [];
    tocDirList.forEach(toc => {
      result.push(toc.id);
    });
    setTocDir(result);
    result.length && setTocActive(result[0]);
  }, [contentStr]);
  // 监听滚动，修改toc选中
  useEffect(() => {
    const scrollChangeTocActive = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      
      if (!tocDir.length || activeFlag) return;
      tocDir.forEach(toc => {
        const tocElement = document.getElementById(toc);
        if (!tocElement) return;
        const sectionHeight = tocElement.offsetHeight;
        const sectionTop = tocElement.offsetTop;

        if (scrollY > sectionTop - 80 - 20 && scrollY <= sectionTop + sectionHeight) {
          setTocActive(toc);
        }
      });
    };
    const throttleScrollChange = throttle(scrollChangeTocActive, 100);

    window.addEventListener("scroll", throttleScrollChange);
    return () => {
      window.removeEventListener("scroll", throttleScrollChange);
    };
  }, [tocDir]);

  return (
    <>
      {
        directory.length ?
          <div className={module.container}>
            <div className={module.description__container}>
              <span className={module.description__text}>{curDir.desc}</span>
            </div>
            <div className={`${module.wrapper} grid`}>
              <div className={module.sidebar__container}>
                <div className={module.sidebar__wrapper}>
                  <aside className={module.sidebar}>
                    <nav>
                      <ul className={`${module.sidebar__ul} flex column gap-row-1`}>
                        {
                          directory.map(dir => (
                            <React.Fragment key={dir.title}>
                              <li className={module.sidebar__module}>
                                <strong>{ dir.title }</strong>
                              </li>
                              {
                                dir.children.length && dir.children.map(subDir => (
                                  <li
                                    key={subDir.title}
                                    onClick={() => changeDir(subDir)}
                                    className={`${module.sidebar__knowledge} ${curDir.title === subDir.title ? module['sidebar__knowledge--active'] : ''}`}>
                                    { subDir.title }
                                  </li>
                                ))
                              }
                            </React.Fragment>
                          ))
                        }
                      </ul>
                    </nav>
                  </aside>
                </div>
                <div className={module.toc__container}>
                  <aside className={module.toc}>
                    <h2 className={module.toc__title}>In this Article</h2>
                    <nav>
                      <ul>
                        {
                          tocDir.length > 0 && tocDir.map(item => {
                            return <li 
                              onClick={() => scrollToAnchor(item)}
                              key={item}
                              className={`${module.toc__item} ${tocActive === item ? module['toc__item--active'] : ''} ellipsis`}
                            >
                              {item}
                            </li>;
                          })
                        }
                      </ul>
                    </nav>
                  </aside>
                </div>
              </div>
              <main className={module.main__content}>
                <article className={module.main__article}>
                  { 
                    contentStr 
                      ? transformToHtml(contentStr) 
                      : <div className={module.empty}>笔记未添加</div>
                  }
                </article>
              </main>
            </div>
          </div>
          : '404'
      }
    </>
  );
}

export default Document;