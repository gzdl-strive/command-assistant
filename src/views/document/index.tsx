import { useLocation } from "react-router-dom";
import module from "./style.module.css";
import directory from "@a/dodument/directory.md?raw";

console.log(directory);

function Document() {
  const location = useLocation();

  const { describe } = location.state;

  return (
    <div className={module.container}>
      <div className={module.description__container}>
        <span className={module.description__text}>{describe}</span>
      </div>
      <div className={`${module.wrapper} grid`}>
        <div className={module.sidebar__container}>
          <div className={module.sidebar__wrapper}>
            <aside className={module.sidebar}>
              <nav className={module.sidebar__nav}>
                <ul className={module.sidebar__list}>
                  <li className={module.sidebar__item}>Linux命令</li>
                  <li className={module.sidebar__item}>Vim</li>
                  <li className={module.sidebar__item}>HTML</li>
                  <li className={module.sidebar__item}>CSS</li>
                  <li className={module.sidebar__item}>JS</li>
                </ul>
              </nav>
            </aside>
          </div>
          <div className={module.toc__container}>
            <aside className={module.toc}>
              <nav>
                <ul>
                  <li>Linux命令</li>
                  <li>Vim</li>
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>JS</li>
                </ul>
              </nav>
            </aside>
          </div>
        </div>
        <main className={module.main__content}>
          <article>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
          </article>
        </main>
      </div>
    </div>
  );
}

export default Document;