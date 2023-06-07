import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Scroll from "@u/scroll";
import module from "./style.module.css";
import direct from "@a/document/directory.json";
import { DirectType, LocationState, DirType } from "./typing";

const directory: DirectType = direct.directory;

function Document() {
  const [curDir, setCurDir] = useState({
    title: '',
    path: ''
  });
  const [contentStr, setContentStr] = useState('');

  const location = useLocation();
  const { 
    defaultDir,
    describe
  }: LocationState = location.state;

  // 点击修改目录
  const changeDir = async (dir: DirType) => {
    const { title, path } = dir;
    title !== curDir.title && setCurDir({
      title,
      path
    });
    Scroll.Top();
    
    import(/*@vite-ignore*/path + "?raw").then(res => {
      if (res && res.default) {
        setContentStr(res.default);
      }
    });
  };

  // 解析md文档为html结构
  const md2Html = () => {
    return <ReactMarkdown
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        h2: ({ node, ...nodeProps }) => {
          return <h2
            {...nodeProps}
            id={nodeProps?.children[0] as string}
          />;
        }
      }}
    >{contentStr}</ReactMarkdown>;
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

  // 跳转至指定锚点
  const scrollToAnchor = (name: string) => {
    console.log(name);
    
    if (name) {
      const anchorElement = document.getElementById(name);
      anchorElement && window.scrollTo({
        top: anchorElement.offsetTop
      });
    }
  };

  useEffect(() => {
    if (!directory.length || !directory[0].children.length) {
      return;
    }
    getMDByName(defaultDir);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultDir]);

  return (
    <>
      {
        directory.length ?
          <div className={module.container}>
            <div className={module.description__container}>
              <span className={module.description__text}>{describe}</span>
            </div>
            <div className={`${module.wrapper} grid`}>
              <div className={module.sidebar__container}>
                <div className={module.sidebar__wrapper}>
                  <aside className={module.sidebar}>
                    <nav>
                      <ul className={`flex column gap-row-1`}>
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
                    <nav>
                      <ul>
                        <li onClick={() => scrollToAnchor('footer')}>查看</li>
                      </ul>
                    </nav>
                  </aside>
                </div>
              </div>
              <main className={module.main__content}>
                <article className={module.main__article}>
                  { contentStr ? md2Html() : 'empty' }
                </article>
              </main>
              <footer id="footer">footer</footer>
            </div>
          </div>
          : '404'
      }
    </>
  );
}

export default Document;