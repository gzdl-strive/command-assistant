import { useLocation } from "react-router-dom";
import module from "./style.module.css";

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
          <aside className={module.sidebar}>
            {/* <nav>
              <ul>
                <li>Linux常用</li>
                <li>Vim</li>
              </ul>
            </nav> */}
          </aside>
          <div className={module.toc__container}>
            <aside className={module.toc}></aside>
          </div>
        </div>
        <main className={module.main__content}>
          <article></article>
        </main>
      </div>
    </div>
  );
}

export default Document;