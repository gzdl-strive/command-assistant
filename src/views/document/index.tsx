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
      <div className={module.wrapper}>
        <div className={module.sidebar__container}></div>
        <main className={module.main__content}>
          <article></article>
        </main>
      </div>
    </div>
  );
}

export default Document;